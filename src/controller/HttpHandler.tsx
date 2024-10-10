/**
 * This utility class is used to check the response of the server.
 *
 * @author Benedikt
 * @version 1.0
 */
export default class HttpHandler {
    private constructor() {}

    /**
     * async function to check the response of the server
     *
     * @param acceptingStatus list of all accepting HTTP status codes
     * @param response response of the server
     * @param message optional message to add to the error message
     */
    public static async checkResponse(
        acceptingStatus: number[],
        response: Response,
        message?: string
    ): Promise<void> {
        if (!acceptingStatus.includes(response.status)) {
            const data = await response.json();
            const errorMessage = data.message;
            const suffix = message ? "\n" + message : "";
            throw new Error(errorMessage + suffix);
        }
    }
}

