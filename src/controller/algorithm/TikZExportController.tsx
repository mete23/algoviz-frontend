import { Generator } from "../../views/view_components/sidebars/animation/DownloadAnimation";
import HttpHandler from "../HttpHandler";

/**
 * This class is responsible for the communication with the backend for the TikZ export.
 * @author Benedikt
 * @version 1.0
 */
export default class TikZExportController {
    private pathPrefix: string = "/api/algorithms/export";
    private paramSessionId: string = "?sessionId=";
    private acceptingHttpStatus: number[] = [200];

    /**
     * async function to get the export-frames of the animation from the backend
     *
     * @param sessionId session id as number
     * @param generator generator name as string
     * @returns list of all export-frames
     */
    async getExportAnimation(
        sessionId: number,
        generator: string
    ): Promise<string[]> {
        const response = await fetch(
            process.env.REACT_APP_BACKEND_URL +
                this.pathPrefix +
                "/" +
                generator +
                this.paramSessionId +
                sessionId,
            { method: "GET" }
        );
        await HttpHandler.checkResponse(this.acceptingHttpStatus, response, "");
        return response.json();
    }

    /**
     * async function to get thenumber of export-frames of the animation from the backend
     *
     * @param sessionId session id as number
     * @returns the number of export-frames / animation steps
     */
    async getListSize(sessionId: number): Promise<number> {
        const response = await fetch(
            process.env.REACT_APP_BACKEND_URL +
                this.pathPrefix +
                "/size" +
                this.paramSessionId +
                sessionId,
            { method: "GET" }
        );
        await HttpHandler.checkResponse(this.acceptingHttpStatus, response, "");
        const data = await response.json();
        return data.number;
    }

    /**
     * async function to get all available generators from the backend
     *
     * @returns list of all available generators
     */
    async getGenerators(): Promise<Generator[]> {
        const response = await fetch(
            process.env.REACT_APP_BACKEND_URL + this.pathPrefix,
            { method: "GET" }
        );
        await HttpHandler.checkResponse(this.acceptingHttpStatus, response, "");
        return response.json();
    }
}

