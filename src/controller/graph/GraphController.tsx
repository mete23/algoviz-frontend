import Graph from "../../model/graph/Graph";
import Node from "../../model/graph/Node";
import Edge from "../../model/graph/Edge";
import EdgeExternal from "../../model/graph/EdgeExternal";
import NodeExternal from "../../model/graph/NodeExternal";
import HttpHandler from "../HttpHandler";

/**
 * This class is responsible for the communication with the backend for the graph generation.
 *
 * @author Benedikt, Tim
 * @version 1.0
 */
export default class GraphController {
    private pathPrefix: string = "/api/graph";
    private paramSessionId: string = "?sessionId=";
    private acceptingHttpStatus: number[] = [200];

    /**
     * async function to get the graph for the session from the backend
     *
     * @param sessionId session id as number
     * @returns graph for the session
     */
    async getGraph(sessionId: number): Promise<Graph> {
        const response = await fetch(
            process.env.REACT_APP_BACKEND_URL +
                this.pathPrefix +
                this.paramSessionId +
                sessionId,
            { method: "GET" }
        );
        await HttpHandler.checkResponse(this.acceptingHttpStatus, response, "");
        const data = await response.json();
        return GraphController.convertGraph(data);
    }

    private createGraph = (graph: Graph) => {
        const nodesExternal: NodeExternal[] = [];
        const edgesExternal: EdgeExternal[] = [];
        graph.getEdges().forEach((edge) => {
            edgesExternal.push({
                id: edge.id,
                sourceId: edge.source.id,
                targetId: edge.target.id,
                colorHexadecimal: edge.colorHexadecimal,
                weight: edge.weight,
            });
        });
        graph.getNodes().forEach((node) => {
            nodesExternal.push({
                id: node.id,
                coordinates: node.coordinates,
                label: node.label,
                colorHexadecimal: node.colorHexadecimal,
                startingNode: node.startingNode,
            });
        });
        return {
            nodes: nodesExternal,
            edges: edgesExternal,
            weighted: graph.isWeighted(),
            directed: graph.isDirected(),
        };
    };

    /**
     * async function to set the graph for the session to the backend
     *
     * @param sessionId session id as number
     * @param graph instance of a graph to be set
     * @returns nothing
     */
    async setGraph(sessionId: number, graph: Graph): Promise<void> {
        const response = await fetch(
            process.env.REACT_APP_BACKEND_URL +
                this.pathPrefix +
                this.paramSessionId +
                sessionId,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(this.createGraph(graph)),
            }
        );
        await HttpHandler.checkResponse(this.acceptingHttpStatus, response, "");
    }

    /**
     * utility function to convert the graph from the backend to the graph model
     *
     * @param data response of a graph request
     * @returns instance of a graph
     */
    static convertGraph(data: any): Graph {
        const nodes: Node[] = data.nodes;
        const weighted = data.weighted;
        const directed = data.directed;
        const graph: Graph = new Graph(nodes, [], weighted, directed);

        data.edges.forEach((edge: EdgeExternal) => {
            const source = graph.getNodeById(edge.sourceId);
            const target = graph.getNodeById(edge.targetId);
            if (source && target) {
                graph.addEdge(
                    new Edge(
                        edge.id,
                        source,
                        target,
                        edge.weight,
                        edge.colorHexadecimal
                    )
                );
            }
        });
        return graph;
    }
}

