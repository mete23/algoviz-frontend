import HttpHandler from "./HttpHandler";

/**
 * This class is responsible for the communication with the backend for the session.
 *
 * @autor Benedikt, Tobi
 * @version 1.0
 */
export default class SessionController {
    private pathPrefix: string = "/api/sessions";
    private paramSessionId: string = "?sessionId=";
    private acceptingHttpStatus: number[] = [200];

    /**
     * async function to start a new session
     *
     * @returns session id as number
     */
    async startSession(): Promise<number> {
        const response = await fetch(
            process.env.REACT_APP_BACKEND_URL + this.pathPrefix + "/start",
            { method: "POST" }
        );
        await HttpHandler.checkResponse(this.acceptingHttpStatus, response, "");
        return response.json();
    }

    /**
     * async function to end a session
     *
     * @param sessionId session id as number
     * @returns nothing
     */
    async endSession(sessionId: number): Promise<void> {
        const response = await fetch(
            process.env.REACT_APP_BACKEND_URL +
                this.pathPrefix +
                "/delete" +
                this.paramSessionId +
                sessionId,
            { method: "POST" }
        );
        await HttpHandler.checkResponse(this.acceptingHttpStatus, response, "");
        return response.json();
    }
}

