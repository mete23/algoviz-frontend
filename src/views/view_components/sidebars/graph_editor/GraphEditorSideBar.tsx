import { Dispatch, SetStateAction, useEffect } from "react";
import { FormGroup, Input, Label } from "reactstrap";

import Graph from "../../../../model/graph/Graph";
import { ChangeView } from "./ChangeView";
import { ChangeDirected } from "./ChangeDirected";
import { ChangeWeighted } from "./ChangeWeighted";
import { GraphEditMode } from "../../../2DVisualization/GraphVisualizationTwoD";
import EditModeSelector from "./EditModeSelector";

import { ViewStyleEnum } from "../../../2DVisualization/ViewStyleEnum";
import Node from "../../../../model/graph/Node";
import Edge from "../../../../model/graph/Edge";
import { StorageObject } from "../../../StartingPageView";

import { Button } from 'reactstrap';

export interface GraphEditorSideBarProps {
    sessionId: number;
    graph: Graph;
    setUpdateGraph: () => void;
    view: ViewStyleEnum;
    setView: Dispatch<SetStateAction<ViewStyleEnum>>;
    graphEditMode: GraphEditMode;
    setGraphEditMode: (graphEditMode: GraphEditMode) => void;
    selectedNodes: Node[];
    // selectedEdge?: Edge;
    markedEdge?: Edge;
    updateLabelEditor?: boolean;
    setUpdateLabelEditor?: (updateLabelEditor: boolean) => void;
    setSelectMode: (bool: boolean) => void;
    storageObject: StorageObject;
}

export default function GraphEditorSideBar(props: GraphEditorSideBarProps) {
    useEffect(() => {
        if (
            props.updateLabelEditor === true &&
            props.setUpdateLabelEditor !== undefined
        ) {
            props.setUpdateLabelEditor(false);
        }
    }, [props.updateLabelEditor]);

    return (
        <div>
            <div>
                <ChangeView viewStyle={props.view} setView={props.setView} />
                <ChangeDirected
                    graph={props.graph}
                    setUpdateGraph={props.setUpdateGraph}
                />
                <ChangeWeighted
                    graph={props.graph}
                    setUpdateGraph={props.setUpdateGraph}
                />
            </div>
            <br />
            <EditModeSelector
                graphEditMode={props.graphEditMode}
                setGraphEditMode={props.setGraphEditMode}
                setSelectMode={props.setSelectMode}
                storageObject={props.storageObject}
            />
            <div>
                <br />
                <FormGroup switch>
                    <Input
                        id="startingNodeSwitch"
                        type="checkbox"
                        title="select node as starting node"
                        defaultChecked={
                            props.selectedNodes[0]?.startingNode
                                ? props.selectedNodes[0] !== undefined
                                : false
                        }
                        onClick={() => {
                            if (props.selectedNodes[0] == undefined) return;
                            props.graph.getNodes().forEach((node) => {
                                node.startingNode = false;
                            });
                            props.selectedNodes[0].startingNode =
                                !props.selectedNodes[0].startingNode;
                            props.setUpdateGraph();
                        }}
                    />
                    Starting Node
                </FormGroup>
                <br />
                <div>
                    <Label for="luluInput">Node Label</Label>
                    <Input
                        defaultValue={props.selectedNodes[0]?.label}
                        id="luluInput"
                        key="luluInput"
                        title='write the label of the selected node here'
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                if (props.selectedNodes[0] !== undefined) {
                                    props.selectedNodes[0].label = (e.target as HTMLInputElement).value;
                                }
                                props.setUpdateGraph();
                            }
                        }}
                        onBlur={(d) => {
                            if (props.selectedNodes[0] !== undefined) {
                                props.selectedNodes[0].label = d.target.value;
                            }
                            props.setUpdateGraph();
                        }}
                    />
                </div>
                <br />
                <div>
                    <Label for="luluInput">Edge Label</Label>
                    <Input
                        defaultValue={props.markedEdge?.weight}
                        id="luluInput"
                        title='write the label of the selected edge here'
                        key="luluInput"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                if (props.markedEdge !== undefined) {
                                    const weight = parseFloat((e.target as HTMLInputElement).value);
                                    if (!isNaN(weight)) {
                                        props.markedEdge.weight = weight;
                                    }
                                }
                                props.setUpdateGraph();
                            }
                        }}
                        onBlur={(d) => {
                            if (props.markedEdge !== undefined) {
                                const weight = parseFloat(d.target.value);
                                if (!isNaN(weight)) {
                                    props.markedEdge.weight = weight;
                                }
                            }
                            props.setUpdateGraph();
                        }}
                    />
                </div>
                <br />
                <div>
                    {props.graph.isWeighted() ?
                        <Button
                            title='assign random weights to the edges'
                            color='primary'
                            onClick={() => {
                                props.graph.getEdges().forEach(currentEdge => {
                                    currentEdge.weight = Math.floor(Math.random() * props.graph.getNodes().length * 1.5 + 1);
                                    props.setUpdateGraph();
                                })
                            }}
                        >
                            Random Weights</Button>
                        : <></>
                    }
                </div>
            </div>
        </div>
    );
}

