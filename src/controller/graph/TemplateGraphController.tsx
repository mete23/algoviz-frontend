import Graph from "../../model/graph/Graph";
import HttpHandler from "../HttpHandler";
import GraphController from "./GraphController";

/**
 * represents a stored graph in the backend
 */
export interface StoredGraph {
    id: number;
    name: string;
    filePath: string;
}

/**
 * This class is responsible for the communication with the backend for the graph selection.
 *
 * @author Benedikt
 * @version 1.0
 */
export default class TemplateGraphController {
    private pathPrefix: string = "/api/graph/templates";
    private paramSessionId: string = "?sessionId=";
    private paramGraphId: string = "?graphId=";
    private acceptingHttpStatus: number[] = [200];

    /**
     * async function to get all graph ids from the backend
     *
     * @returns list of graph ids as string
     */
    async getTemplatedGraphId(): Promise<string[]> {
        const response = await fetch(
            process.env.REACT_APP_BACKEND_URL + this.pathPrefix,
            { method: "GET" }
        );
        await HttpHandler.checkResponse(this.acceptingHttpStatus, response, "");
        return response.json();
    }

    /**
     * async function to get the information about a graph from the backend
     *
     * @param graphId id of the graph
     * @returns information about the graph as StoredGraph
     */
    async getTemplateGraphCard(graphId: string): Promise<StoredGraph> {
        const response = await fetch(
            process.env.REACT_APP_BACKEND_URL + this.pathPrefix + "/" + graphId,
            { method: "GET" }
        );
        await HttpHandler.checkResponse(this.acceptingHttpStatus, response, "");
        return response.json();
    }

    /**
     * async function to get the templated graph from the backend
     *
     * @param graphId id of the graph as string
     * @returns the graph as Graph
     */
    async getTemplateGraph(graphId: string): Promise<Graph> {
        const response = await fetch(
            process.env.REACT_APP_BACKEND_URL +
                this.pathPrefix +
                "/" +
                graphId +
                "/template",
            { method: "GET" }
        );
        await HttpHandler.checkResponse(this.acceptingHttpStatus, response, "");
        const data = await response.json();

        return GraphController.convertGraph(data);
    }
}

