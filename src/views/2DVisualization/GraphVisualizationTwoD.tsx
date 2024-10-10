import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { ViewStyleEnum } from "./ViewStyleEnum";
import Graph from "../../model/graph/Graph";
import Node from "../../model/graph/Node";
import Edge from "../../model/graph/Edge";
import { StorageObject } from "../StartingPageView";

interface GraphVisualizationTwoDProps {
    graph: Graph;
    viewStyle: ViewStyleEnum;
    updateGraph: number;
    graphEditMode?: GraphEditMode;
    setGraphEditMode?: (graphEditMode: GraphEditMode) => void;
    markedNodesArray: Node[];
    markedEdge?: Edge;
    setMarkedEdge: (markedEdge: Edge) => void;
    setMarkedNodes: (markedNodesArray: Node[]) => void;
    setUpdateLabelEditor?: (bool: boolean) => void;
    storageObject: StorageObject;
}

export enum GraphEditMode {
    SELECT,
    ADD_NODE,
    REMOVE_NODE,
    ADD_EDGE,
    REMOVE_EDGE,
}

/**
 *
 * @param props GraphVisualizationTwoDProps
 * @returns SVG of the graph
 *
 * @author Metehan, Tobi
 *
 */
export default function GraphVisualizationTwoD(
    props: GraphVisualizationTwoDProps
) {
    const [graphData, setGraphData] = useState(props.graph || []);

    const parentRef = useRef<SVGSVGElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    // frame constants
    const frameWidth: number = document.body.clientWidth * 0.8 * (graphData.getNodes().length / 600) > document.body.clientWidth * 0.8 ? document.body.clientWidth * 0.8 * (graphData.getNodes().length / 600) : document.body.clientWidth * 0.8;
    const frameHeight: number = frameWidth//document.body.clientHeight * 0.95 * (graphData.getNodes().length / 600) > document.body.clientHeight * 0.95 ? document.body.clientHeight * 0.95 * (graphData.getNodes().length / 600) : document.body.clientHeight * 0.95; 

    // arrow constants
    const arrowMarkerWidth: number = 30;
    const arrowMarkerHeight: number = 30;
    const arrowSizeCompact: number = 6;
    const arrowSizeBig: number = 12;

    // node constants
    const nodeRadiusCompact: number = 10;
    const nodeRadiusBig: number = 20;
    const nodeLabelSize: number = 20;
    const nodeLabelColor: string = "#000000"; // black

    // edge constants
    const colorEllipse: string = "rgb(180, 180, 180)"; // matching the color of the background => GraphWrapper background-color
    const ellipseRadiusX: number = 35;
    const ellipseRadiusY: number = 17;

    // svg setup
    let svg = d3.select(svgRef.current);

    /**
     * Utility functions
     *
     * @param node the node
     * @returns x, y
     */
    function calculateNodeCoordinates(node: Node) {
        const x1 = node.coordinates[0] * frameWidth;
        const y1 = node.coordinates[1] * frameHeight;
        return { x: x1, y: y1 };
    }

    /**
     * this method calulactes the arrow path
     *
     * @returns arrowPath
     */
    function calculateArrowPath(arrowSize: number) {
        return (
            "M 0 0 " +
            2 * arrowSize +
            " " +
            arrowSize +
            " 0 " +
            2 * arrowSize +
            " " +
            (1 / 2) * arrowSize +
            " " +
            arrowSize
        );
    }

    /**
     * this method calculates the arrow size
     *
     * @returns arrowSize
     */
    function calculateArrowSize() {
        switch (props.viewStyle) {
            case ViewStyleEnum.BIG:
                return arrowSizeBig;
            case ViewStyleEnum.COMPACT:
                return arrowSizeCompact;
        }
    }

    /**
     * this method calculates the node Radius
     *
     * @returns nodeRadius
     */
    function calculateNodeRadius() {
        switch (props.viewStyle) {
            case ViewStyleEnum.BIG:
                return nodeRadiusBig;
            case ViewStyleEnum.COMPACT:
                return nodeRadiusCompact;
        }
    }

    /**
     * this useEffect deletes the old Arrows on ViewStyle change
     */
    useEffect(() => {
        svg.selectAll("marker").remove();
    }, [props.viewStyle]);

    /**
     * this method calculates the coordinates of the edge
     *
     * @param source the source node
     * @param target the target node
     * @returns sourceX, sourceY, targetX, targetY
     */
    function calculateEdgeCoordinates(
        source: Node,
        target: Node,
        isDirected: boolean
    ) {
        const arrowSize = calculateArrowSize();
        const nodeRadius = calculateNodeRadius();
        const coordinatesSource = calculateNodeCoordinates(source);
        const coordinatesTarget = calculateNodeCoordinates(target);

        const x1 = coordinatesSource.x;
        const y1 = coordinatesSource.y;
        const x2 = coordinatesTarget.x;
        const y2 = coordinatesTarget.y;

        const deltaX = x2 - x1;
        const deltaY = y2 - y1;

        const distanceNodes = Math.sqrt(deltaX ** 2 + deltaY ** 2);

        const deltaXNorm = deltaX / distanceNodes;
        const deltaYNorm = deltaY / distanceNodes;

        const arrowX1 = x1 + deltaXNorm * nodeRadius;
        const arrowY1 = y1 + deltaYNorm * nodeRadius;

        const arrowOffset = isDirected ? nodeRadius + arrowSize : nodeRadius;

        const arrowX2 = x2 - deltaXNorm * arrowOffset;
        const arrowY2 = y2 - deltaYNorm * arrowOffset;

        return {
            sourceX: arrowX1,
            sourceY: arrowY1,
            targetX: arrowX2,
            targetY: arrowY2,
        };
    }

    /**
     * this part handles the zooming and panning
     */
    const kInit : number = (document.body.clientHeight / frameWidth * 0.8)
    const xInit : number = nodeRadiusBig * 2;
    const yInit : number = nodeRadiusBig * 2;
    const [k, setK] = useState(kInit);
    const [x, setX] = useState(xInit);
    const [y, setY] = useState(yInit);

    useEffect(() => {
        const zoom = d3.zoom().on("zoom", (event) => {
            const {x, y, k} = event.transform;
            setK((kInit + k-1) > 0 ? (kInit + k-1) : 0 );
            setX(xInit + x);
            setY(yInit + y);
        });

        d3.select(parentRef.current).call(zoom as any);
    }, [props.graph]);

    /**
     * this function is called when the graph changes and updates the graph and draws the changed things
     *
     */
    useEffect(() => {
        /**
         * initializing the svg
         */
        svg = d3.select(svgRef.current);
        setGraphData(props.graph);

        updateGraph(graphData);
    }, [props.graph, graphData, props.updateGraph, props.viewStyle]);

    /**
     * updates the complete graph
     *
     * @param graphData instance of the current graph
     */
    function updateGraph(graphData: Graph): void {
        updateEdges(graphData);
        updateNodes(graphData);
        updateLabels(graphData);
        let zoom = () => {
            d3.zoom()
                .on("zoom", (event) => {
                    d3.select("svg")
                    .attr("transform", event.transform);
                });
        };
        d3.select("svg").call(zoom);
    }

    /**
     * updates all edges without their labels
     *
     * @param graphData instance of the actual graph
     */
    function updateEdges(graphData: Graph): void {
        const edgesLine = svg.selectAll("line").data(graphData.getEdges());
        edgesLine
            .join("line")
            .attr(
                "x1",
                (d) =>
                    calculateEdgeCoordinates(
                        d.getSource(),
                        d.getTarget(),
                        graphData.isDirected()
                    ).sourceX
            )
            .attr(
                "y1",
                (d) =>
                    calculateEdgeCoordinates(
                        d.getSource(),
                        d.getTarget(),
                        graphData.isDirected()
                    ).sourceY
            )
            .attr(
                "x2",
                (d) =>
                    calculateEdgeCoordinates(
                        d.getSource(),
                        d.getTarget(),
                        graphData.isDirected()
                    ).targetX
            )
            .attr(
                "y2",
                (d) =>
                    calculateEdgeCoordinates(
                        d.getSource(),
                        d.getTarget(),
                        graphData.isDirected()
                    ).targetY
            )
            .attr("stroke", (d) => d.colorHexadecimal)
            .attr("stroke-width", 3)
            .attr("marker-end", (d) => {
                if (graphData.isDirected()) {
                    generateArrow(d);
                    return "url(#arrow" + d.getId() + ")";
                }
                return "";
            });

        /**
         * generates arrow for the edge
         *
         * @param edge edge for which arrow shoud be generated
         */
        function generateArrow(edge: Edge) {
            const arrowSize = calculateArrowSize();
            const arrowPath = calculateArrowPath(arrowSize);
            svg.selectAll("arrow" + edge.getId()).remove();
            svg.append("svg:defs")
                .append("svg:marker")
                .attr("id", "arrow" + edge.getId())
                .attr("refX", arrowSize)
                .attr("refY", arrowSize)
                .attr("markerWidth", arrowMarkerWidth)
                .attr("markerHeight", arrowMarkerHeight)
                .attr("markerUnits", "userSpaceOnUse")
                .attr("orient", "auto")
                .append("path")
                .attr("d", arrowPath)
                .style("fill", edge.colorHexadecimal);
        }
    }

    /**
     * clearing the selected nodes array
     */
    useEffect(() => {
        const nodes = svg.selectAll("circle").data(graphData.getNodes());
        nodes.classed("marked", false);
        props.markedNodesArray.splice(0, props.markedNodesArray.length);
        updateNodes(graphData);
    }, [props.storageObject.graphEditMode]);

    function updateLabelEditor() {
        if (props.setUpdateLabelEditor != undefined) {
            props.setUpdateLabelEditor(true);
        }
    }

    /**
     * updates all nodes without their labels
     *
     * @param graphData instance of the actual graph
     */
    function updateNodes(graphData: Graph): void {
        const nodeRadius = calculateNodeRadius();
        const nodes = svg.selectAll("circle").data(graphData.getNodes());

        nodes
            .join("circle")
            .attr("cx", (d) => calculateNodeCoordinates(d).x)
            .attr("cy", (d) => calculateNodeCoordinates(d).y)
            .attr("r", nodeRadius)
            .attr("fill", (d) => d.colorHexadecimal)
            .attr("fill-opacity", 0.25)
            .attr("stroke", (d) => d.startingNode ? "#00FF00" : d.colorHexadecimal)
            .attr("stroke-width", (d) => d.startingNode ? 3 : 1)
            .classed("marked", (d) => props.markedNodesArray.includes(d))
            .on("click", function (event, d) {
                if (
                    props.storageObject.graphEditMode === GraphEditMode.SELECT
                ) {
                    updateLabelEditor();
                    clearMarkedNodesArray();
                }
                updateNodes(graphData);
                const selectedNode = d3.select(this);
                if (selectedNode.classed("marked")) {
                    svg.select(".mark").remove();
                    selectedNode.classed("marked", false);
                    const index = props.markedNodesArray?.indexOf(d);
                    if (index !== -1 && index != undefined) {
                        props.markedNodesArray?.splice(index, 1);
                    }
                } else {
                    svg.append("circle")
                        .attr("r", nodeRadius - 5)
                        .attr("opacity", 1)
                        .attr("fill", "transparent")
                        .attr("stroke", "#FFFF00")
                        .attr("class", "mark")
                        .attr("cx", selectedNode.attr("cx"))
                        .attr("cy", selectedNode.attr("cy"))
                        .on("click", () => {
                            if (
                                props.storageObject.graphEditMode ===
                                GraphEditMode.SELECT
                            ) {
                                updateLabelEditor();
                                clearMarkedNodesArray();
                            }
                            svg.select(".mark").remove();
                            selectedNode.classed("marked", false);
                            const index = props.markedNodesArray.indexOf(d);
                            if (index !== -1) {
                                props.markedNodesArray.splice(index, 1);
                            }
                        });
                    selectedNode.classed("marked", true);
                    props.markedNodesArray.push(d);
                }
                props.setMarkedNodes([...props.markedNodesArray]);
            })
    }


    useEffect(() => {
        switch (props.storageObject.graphEditMode) {
            case GraphEditMode.ADD_EDGE:
                if (props.markedNodesArray.length > 1) {
                    graphData.addEdge(
                        new Edge(
                            Math.floor(Math.random() * 2147483648),
                            props.markedNodesArray[0],
                            props.markedNodesArray[1],
                            0,
                            "#000000"
                        )
                    );
                    props.markedNodesArray.splice(
                        0,
                        props.markedNodesArray.length
                    );
                    updateGraph(graphData);
                }
                break;

            case GraphEditMode.REMOVE_EDGE:
                if (props.markedNodesArray.length > 1) {
                    graphData.removeEdgeByNodeIds(
                        props.markedNodesArray[0].id,
                        props.markedNodesArray[1].id
                    );
                    graphData.removeEdgeByNodeIds(
                        props.markedNodesArray[1].id,
                        props.markedNodesArray[0].id
                    );
                    props.markedNodesArray.splice(
                        0,
                        props.markedNodesArray.length
                    );
                    updateGraph(graphData);
                }
                break;
            case GraphEditMode.REMOVE_NODE:
                if (props.markedNodesArray.length > 0) {
                    graphData.removeNodeById(props.markedNodesArray[0].id);
                    props.markedNodesArray.splice(
                        0,
                        props.markedNodesArray.length - 1
                    );
                    props.markedNodesArray.splice(0, 1);
                    updateGraph(graphData);
                }
        }
    }, [props.markedNodesArray]);

    /**
     * this code is for marking a node as selected
     */
    const selectedNodesToRemoveEdge: Node[] = [];

    function addNodeToRemoveEdge(node: Node) {
        if (selectedNodesToRemoveEdge.length > 1) {
            graphData.getEdges().filter((edge) => {
                return (
                    edge.getSource() === selectedNodesToRemoveEdge[0] &&
                    edge.getTarget() === selectedNodesToRemoveEdge[1]
                );
            });
        } else {
            selectedNodesToRemoveEdge.push(node);
        }
    }

    function clearMarkedNodesArray() {
        props.markedNodesArray.splice(0, selectedNodesToRemoveEdge.length);
        props.markedNodesArray.splice(0, props.markedNodesArray.length);
        props.setMarkedNodes([...props.markedNodesArray]);
    }

    /**
     * updates the edge's and node's label
     *
     * @param graphData instance of the actual graph
     */
    function updateLabels(graphData: Graph): void {
        const nodesLabel = svg.selectAll(".node").data(graphData.getNodes());
        const edgesEllipse = svg
            .selectAll("ellipse")
            .data(graphData.getEdges());
        const edgesLabel = svg.selectAll(".edge").data(graphData.getEdges());
        const nodeRadius = calculateNodeRadius();

        switch (props.viewStyle) {
            case ViewStyleEnum.BIG:
                // update node's label
                nodesLabel
                    .join("text")
                    .attr("dx", (d) => calculateNodeCoordinates(d).x)
                    .attr(
                        "dy",
                        (d) =>
                            calculateNodeCoordinates(d).y +
                            (nodeLabelSize * 1) / 3
                    )
                    .attr("class", "node")
                    .style("font-size", nodeLabelSize + "px")
                    .style("fill", nodeLabelColor)
                    .style("text-anchor", "middle")
                    .text((d) => d.label)
                    .on("click", function (event, d) {
                        if (
                            props.storageObject.graphEditMode ===
                            GraphEditMode.SELECT
                        ) {
                            updateLabelEditor();
                            if (props.markedNodesArray[0]?.startingNode) {
                                const previousStartingNode = graphData
                                    .getNodes()
                                    .find((node) => node.startingNode);

                                if (previousStartingNode) {
                                    previousStartingNode.startingNode = false;
                                }
                                const clickedNode = graphData.getNodeById(d.id);
                                if (clickedNode) {
                                    clickedNode.startingNode = true;
                                    updateGraph(graphData);
                                }
                            } else {
                                const clickedNode = graphData.getNodeById(d.id);
                                if (clickedNode != undefined) {
                                    clickedNode.startingNode = false;
                                }
                            }
                            clearMarkedNodesArray();
                        }
                        updateNodes(graphData);
                        const selectedNode = svg
                            .selectAll("circle")
                            .data(graphData.getNodes())
                            .filter((node) => node.id === d.id);
                        if (selectedNode.classed("marked")) {
                            svg.select(".mark").remove();
                            selectedNode.classed("marked", false);
                            const index = props.markedNodesArray.indexOf(d);
                            if (index !== -1) {
                                props.markedNodesArray.splice(index, 1);
                            }
                        } else {
                            svg.append("circle")
                                .attr("r", nodeRadius - 5)
                                .attr("opacity", 1)
                                .attr("fill", "transparent")
                                .attr("stroke", "#FFFF00")
                                .attr("class", "mark")
                                .attr("cx", selectedNode.attr("cx"))
                                .attr("cy", selectedNode.attr("cy"))
                                .on("click", () => {
                                    if (
                                        props.storageObject.graphEditMode ===
                                        GraphEditMode.SELECT
                                    ) {
                                        updateLabelEditor();
                                        if (
                                            props.markedNodesArray[0]
                                                ?.startingNode
                                        ) {
                                            const previousStartingNode =
                                                graphData
                                                    .getNodes()
                                                    .find(
                                                        (node) =>
                                                            node.startingNode
                                                    );
                                            if (previousStartingNode) {
                                                previousStartingNode.startingNode =
                                                    false;
                                            }
                                            const clickedNode =
                                                graphData.getNodeById(d.id);
                                            if (clickedNode) {
                                                clickedNode.startingNode = true;
                                                updateGraph(graphData);
                                            }
                                        } else {
                                            const clickedNode =
                                                graphData.getNodeById(d.id);
                                            if (clickedNode != undefined) {
                                                clickedNode.startingNode =
                                                    false;
                                            }
                                        }
                                        clearMarkedNodesArray();
                                    }
                                    svg.select(".mark").remove();
                                    selectedNode.classed("marked", false);
                                    const index =
                                        props.markedNodesArray.indexOf(d);
                                    if (index !== -1) {
                                        props.markedNodesArray.splice(index, 1);
                                    }
                                });
                            selectedNode.classed("marked", true);
                            props.markedNodesArray.push(d);
                        }
                        props.setMarkedNodes([...props.markedNodesArray]);
                    });

                // update edge's label
                if (props.graph.isWeighted()) {
                    edgesEllipse
                        .join("ellipse")
                        .attr("cx", (d) => {
                            const coordinates = calculateEdgeCoordinates(
                                d.getSource(),
                                d.getTarget(),
                                graphData.isDirected()
                            );
                            return (
                                (coordinates.sourceX + coordinates.targetX) / 2
                            );
                        })
                        .attr("cy", (d) => {
                            const coordinates = calculateEdgeCoordinates(
                                d.getSource(),
                                d.getTarget(),
                                graphData.isDirected()
                            );
                            return (
                                (coordinates.targetY + coordinates.sourceY) / 2
                            );
                        })
                        .attr("rx", ellipseRadiusX)
                        .attr("ry", ellipseRadiusY)
                        .attr("fill", colorEllipse);

                    edgesLabel
                        .join("text")
                        .attr("class", "edge")
                        .attr("dx", (d) => {
                            const coordinates = calculateEdgeCoordinates(
                                d.getSource(),
                                d.getTarget(),
                                graphData.isDirected()
                            );
                            return (
                                (coordinates.targetX + coordinates.sourceX) / 2
                            );
                        })
                        .attr("dy", (d) => {
                            const coordinates = calculateEdgeCoordinates(
                                d.getSource(),
                                d.getTarget(),
                                graphData.isDirected()
                            );
                            return (
                                (coordinates.targetY + coordinates.sourceY) / 2
                            );
                        })
                        .style("font-size", nodeLabelSize + "px")
                        .style("fill", (d) => d.colorHexadecimal)
                        .attr("text-anchor", "middle")
                        .attr("dominant-baseline", "central")
                        .text((d) => Math.round(d.weight * 1000) / 1000)
                        .on("click", (event, d) => {
                            if (
                                props.storageObject.graphEditMode ===
                                GraphEditMode.REMOVE_EDGE
                            ) {
                                graphData.removeEdge(d);
                                updateGraph(graphData);
                            }
                            if (
                                props.storageObject.graphEditMode ===
                                GraphEditMode.SELECT
                            ) {
                                if (props.setMarkedEdge) props.setMarkedEdge(d);
                                updateLabelEditor();
                                const edge = graphData.getEdgeById(d.id);
                                if (
                                    edge &&
                                    edge.weight !== undefined &&
                                    props.markedEdge?.weight !== undefined
                                ) {
                                    edge.weight = props.markedEdge.weight;
                                }
                                updateGraph(graphData);
                            }
                        });
                } else {
                    edgesLabel.remove();
                    edgesEllipse.remove();
                }
                break;
            case ViewStyleEnum.COMPACT:
                edgesLabel.remove();
                nodesLabel.remove();
                edgesEllipse.remove();
                break;
        }
    }

    /**
     * handles on click event on svg element, when graph edit mode is set to add node
     *
     * @param mouseX x coordinate of mouse click
     * @param mouseY y coordinate of mouse click
     */
    function addNodeOnClick(mouseX: number, mouseY: number): void {
        if (props.storageObject.graphEditMode === GraphEditMode.ADD_NODE) {
            graphData.addNode(
                new Node(
                    Math.floor(Math.random() * 2147483648),
                    [
                        (-x + mouseX) / k / frameWidth,
                        (-y + mouseY) / k / frameHeight,
                    ],
                    "",
                    false,
                    "#000000"
                )
            );
            updateGraph(graphData);
        }
    }

    /**
     * resets marked nodes array when graph edit mode changes
     */
    useEffect(() => {
        clearMarkedNodesArray();
        updateGraph(graphData);
    }, [props.storageObject.graphEditMode]);

    return (
        <div>
            <div className="GraphWrapper">
                <svg
                    name='graph_svg'
                    ref={parentRef}
                    width={frameWidth}
                    height={frameHeight}
                    onClick={(event) => {
                        addNodeOnClick(
                            d3.pointer(event)[0],
                            d3.pointer(event)[1]
                        );
                    }}
                >
                    <g
                        ref={svgRef}
                        transform={`translate(${x},${y})scale(${k})`}
                    >
                        <circle cx="40" cy="40" r="25" />
                        <circle cx="60" cy="60" r="25" />
                    </g>
                </svg>
            </div>
        </div>
    );
}

