import HttpHandler from "./HttpHandler";

/**
 * This interface represents the help information entry.
 */
export interface HelpInformationEntry {
    id:number;
    title: string;
}

/**
 * This class represents the controller for the help information.
 * 
 * @author David
 * @version 0.1
 */
export default class HelpInformationController {
    private pathPrefix: string = "/api/help";
    private acceptingHttpStatus: number[] = [200];


    async getHelpInformationIds():Promise<number[]> {
        const response = await fetch(
            process.env.REACT_APP_BACKEND_URL + 
            this.pathPrefix,
            { method: "GET" }
        )
        await HttpHandler.checkResponse(this.acceptingHttpStatus, response, "");
        return response.json();
    }

    async getHelpInformationEntry(id: number):Promise<HelpInformationEntry> {
        const response = await fetch(
            process.env.REACT_APP_BACKEND_URL + 
            this.pathPrefix + 
            "/" + 
            id,
            { method: "GET" }
        )
        await HttpHandler.checkResponse(this.acceptingHttpStatus, response, "");
        return response.json();
    }

    async getHelpInformationText(id: number):Promise<string> {
        const response = await fetch(
            process.env.REACT_APP_BACKEND_URL + 
            this.pathPrefix + 
            "/" + 
            id +
            "/text",
            { method: "GET" }
        )
        await HttpHandler.checkResponse(this.acceptingHttpStatus, response, "");
        return response.text();
    }
}