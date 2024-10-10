import Graph from "../../model/graph/Graph";
import GraphController from "../graph/GraphController";
import HttpHandler from "../HttpHandler";

/**
 * Controller for the execution of algorithms.
 *
 * @author Benedikt, Tobias
 * @version 1.0
 */
class AlgorithmExecutionController {
    private pathPrefix: string = "/api/algorithms/execute";
    private paramSessionId: string = "?sessionId=";
    private acceptingHttpStatus: number[] = [200];

    /**
     * async function to start the execution of an algorithm
     *
     * @param sessionId the id of the session as number
     * @returns nothing
     */
    async startExecution(sessionId: number): Promise<void> {
        const response = await fetch(
            process.env.REACT_APP_BACKEND_URL +
                this.pathPrefix +
                this.paramSessionId +
                sessionId,
            { method: "POST" }
        );
        await HttpHandler.checkResponse(this.acceptingHttpStatus, response, "");
    }

    /**
     * async function to check if the execution of an algorithm is finished
     *
     * @param sessionId the id of the session as number
     * @returns true if the execution is finished, false if not
     */
    async isExecuted(sessionId: number): Promise<boolean> {
        const response = await fetch(
            process.env.REACT_APP_BACKEND_URL +
                this.pathPrefix +
                this.paramSessionId +
                sessionId,
            { method: "GET" }
        );
        await HttpHandler.checkResponse(this.acceptingHttpStatus, response, "");
        return response.json();
    }

    /**
     * async function to get the next step of the execution of an algorithm
     *
     * @param sessionId the id of the session as number
     * @returns the next step of the execution as Graph
     */
    async getNextStep(sessionId: number): Promise<any> {
        const response = await fetch(
            process.env.REACT_APP_BACKEND_URL +
                this.pathPrefix +
                "/next" +
                this.paramSessionId +
                sessionId,
            { method: "GET" }
        );
        await HttpHandler.checkResponse(this.acceptingHttpStatus, response, "");
        return response.json();
    }

    /**
     * async function to check if the next step of the execution of an algorithm is available
     *
     * @param sessionId the id of the session as number
     * @returns true if the next step is available, false if not
     */
    async hasNext(sessionId: number): Promise<boolean> {
        const response = await fetch(
            process.env.REACT_APP_BACKEND_URL +
                this.pathPrefix +
                "/next/available" +
                this.paramSessionId +
                sessionId,
            { method: "GET" }
        );
        await HttpHandler.checkResponse(this.acceptingHttpStatus, response, "");
        return response.json();
    }

    /**
     * async function to reset the animation of the execution of an algorithm
     *
     * @param sessionId the id of the session as number
     * @returns the unmodified graph of the session as Graph
     */
    async resetAnimation(sessionId: number): Promise<Graph> {
        const response = await fetch(
            process.env.REACT_APP_BACKEND_URL +
                this.pathPrefix +
                "/reset" +
                this.paramSessionId +
                sessionId,
            { method: "GET" }
        );
        await HttpHandler.checkResponse(this.acceptingHttpStatus, response);
        const data = await response.json();
        return GraphController.convertGraph(data);
    }

    /**
     * async function to get the last step of the execution of an algorithm
     * 
     * @param sessionId the id of the session as number
     * @returns the last step of the execution as Graph
     */
    async getLastStep(sessionId: number): Promise<any> {
        const response = await fetch(
            process.env.REACT_APP_BACKEND_URL +
                this.pathPrefix +
                "/last" +
                this.paramSessionId +
                sessionId,
            { method: "GET" }
        );
        await HttpHandler.checkResponse(this.acceptingHttpStatus, response, "");
        return response.json();
    }
}
export default AlgorithmExecutionController;

