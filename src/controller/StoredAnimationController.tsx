import HttpHandler from "./HttpHandler";

/**
 * Controller for the stored animation endpoints.
 *
 * @author David
 * @version 1.0
 */
export default class StoredAnmationController {
    private pathPrefix: string = "/api/stored-animation";
    private paramSessionId: string = "?sessionId=";
    private acceptingHttpStatus: number[] = [200];

    /**
     * async function to store the animation of the given session id.
     *
     * @param sessionId the session id as number of the animation to store
     * @returns the id of the stored animation as number
     */
    async storeAnimation(sessionId: number): Promise<number> {
        const response = await fetch(
            process.env.REACT_APP_BACKEND_URL +
                this.pathPrefix +
                "/store" +
                this.paramSessionId +
                sessionId,
            { method: "POST" }
        );
        await HttpHandler.checkResponse(this.acceptingHttpStatus, response, "");
        return await response.json();
    }

    /**
     * async function to load the animation of the given animation id.
     *
     * @param sessionId the actual session id as number
     * @param storedAnimationId the id of the stored animation as number
     * @returns nothing
     */
    async setAnimation(
        sessionId: number,
        storedAnimationId: number
    ): Promise<void> {
        const response = await fetch(
            process.env.REACT_APP_BACKEND_URL +
                this.pathPrefix +
                "/" +
                storedAnimationId +
                this.paramSessionId +
                sessionId,
            { method: "POST" }
        );
        await HttpHandler.checkResponse(this.acceptingHttpStatus, response, "");
    }
}

