import HttpHandler from "./HttpHandler";

/**
 * This class is responsible for the communication with the backend to upload a logfile.
 *
 * @author Benedikt
 * @version 1.0
 */
export default class UploadLogfileController {
    private pathPrefix: string = "/api/logfile";
    private paramSessionId: string = "?sessionId=";
    private acceptingHttpStatus: number[] = [200];

    /**
     * async function to upload a logfile to the backend
     *
     * @param sessionId session id as number
     * @param fileContent content of log file
     * @returns nothing
     */
    async uploadLogData(sessionId: number, fileContent: string): Promise<void> {
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

