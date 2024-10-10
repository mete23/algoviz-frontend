import HttpHandler from "../HttpHandler";

/**
 * This class is responsible for the communication with the backend for the graph upload.
 *
 * @autor Benedikt
 * @version 1.0
 */
export class UploadGraphController {
    private pathPrefix: string = "/api/graph/upload";
    private paramSessionId: string = "?sessionId=";
    private acceptingHttpStatus: number[] = [200];

    /**
     * async function to upload a graph to the backend
     *
     * @param sessionId session id as number
     * @param formData graph as FormData
     * @returns nothing
     */
    async uploadGraphData(
        sessionId: number,
        fileContent: string
    ): Promise<void> {
        const response = await fetch(
            process.env.REACT_APP_BACKEND_URL +
                this.pathPrefix +
                this.paramSessionId +
                sessionId,
            {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain",
                },
                body: fileContent,
            }
        );
        await HttpHandler.checkResponse(this.acceptingHttpStatus, response, "");
    }
}
