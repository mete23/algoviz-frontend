import HttpHandler from "../HttpHandler";

/**
 * This class is responsible for the communication with the backend for the algorithm selection.
 *
 * @author Benedikt
 * @version 1.0
 */
export default class AlgorithmSelectionController {
    private pathPrefix: string = "/api/algorithms";
    private paramSessionId: string = "?sessionId=";
    private acceptingHttpStatus: number[] = [200];

    /**
     * async function to get all available algorithms from the backend
     * @returns list of all available algorithms
     */
    async getAlgorithms(): Promise<string[]> {
        const response = await fetch(
            process.env.REACT_APP_BACKEND_URL + this.pathPrefix,
            { method: "GET" }
        );
        await HttpHandler.checkResponse(this.acceptingHttpStatus, response, "");
        return response.json();
    }

    /**
     * async function to get the name of the algorithm
     *
     * @param algorithm name of the algorithm
     * @returns the name of the algorithm as string
     */
    async getName(algorithm: string): Promise<string> {
        const response = await fetch(
            process.env.REACT_APP_BACKEND_URL +
                this.pathPrefix +
                "/" +
                algorithm +
                "/name",
            { method: "GET" }
        );
        await HttpHandler.checkResponse(
            this.acceptingHttpStatus,
            response,
            ": " + algorithm + " not found"
        );
        const data = await response.json();
        return data.value;
    }

    /**
     * async function to get the description of the algorithm
     * @param algorithm name of the algorithm
     * @returns the description of the algorithm as string
     */
    async getDescription(algorithm: string): Promise<string> {
        const response = await fetch(
            process.env.REACT_APP_BACKEND_URL +
                this.pathPrefix +
                "/" +
                algorithm +
                "/description",
            { method: "GET" }
        );
        await HttpHandler.checkResponse(
            this.acceptingHttpStatus,
            response,
            ": " + algorithm + " not found"
        );
        const data = await response.json();
        return data.value;
    }

    /**
     * async function to set the algorithm for the session in the backend
     * @param sessionId session id as number
     * @param algorithm chosen algorithm as string
     */
    async setAlgorithm(sessionId: number, algorithm: string): Promise<void> {
        const response = await fetch(
            process.env.REACT_APP_BACKEND_URL +
                this.pathPrefix +
                "/" +
                algorithm +
                this.paramSessionId +
                sessionId,
            { method: "POST" }
        );
        await HttpHandler.checkResponse(this.acceptingHttpStatus, response, "");
    }
}

