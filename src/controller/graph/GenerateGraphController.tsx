import Graph from "../../model/graph/Graph";
import HttpHandler from "../HttpHandler";
import GraphController from "./GraphController";
import { Formular } from "../../views/view_components/options/OptionFormularView";

/**
 * represents a generator option in a drop down menu
 */
export interface GeneratorOption {
    generatorType: string;
    label: string;
}

export interface GeneratorParameter {
    command: string;
    description: string;
    parameterVariableType: string;
    minimum: number;
    maximum: number;
}

/**
 * represents a paramter value for kagen
 */
export interface ParameterValue {
    type: string;
    value: string;
    kaGenParameter: KaGenParameter;
}

/**
 * represents a parameter from kagen
 */
export interface KaGenParameter {
    command: string;
}

/**
 * This class is responsible for the communication with the backend for the graph generation.
 *
 * @author Benedikt, David
 * @version 1.0
 */
export default class GenerateGraphController {
    private pathPrefix: string = "/api/graph/generators";
    private paramSessionId: string = "?sessionId=";
    private acceptingHttpStatus: number[] = [200];

    /**
     * async function to get all available graph generators
     *
     * @returns list of all available graph generators
     */
    async getGenerators(): Promise<string[]> {
        const response = await fetch(
            process.env.REACT_APP_BACKEND_URL + this.pathPrefix,
            { method: "GET" }
        );
        await HttpHandler.checkResponse(this.acceptingHttpStatus, response);
        return response.json();
    }

    /**
     * aync function to get the visualisation-card for the generator
     *
     * @param generator concrete graph generator
     * @returns visualisation-card for the generator
     */
    async getGeneratorOption(generator: string): Promise<GeneratorOption> {
        const response = await fetch(
            process.env.REACT_APP_BACKEND_URL +
                this.pathPrefix +
                "/" +
                generator +
                "/option",
            { method: "GET" }
        );
        await HttpHandler.checkResponse(this.acceptingHttpStatus, response, "");
        return response.json();
    }

    /**
     * aync function to get the parameters for the generator
     *
     * @param generator concrete graph generator
     * @returns list of parameters for the generator
     */
    async getGeneratorParams(generator: string): Promise<GeneratorParameter[]> {
        const response = await fetch(
            process.env.REACT_APP_BACKEND_URL +
                this.pathPrefix +
                "/" +
                generator +
                "/param",
            { method: "GET" }
        );
        await HttpHandler.checkResponse(this.acceptingHttpStatus, response, "");
        return response.json();
    }

    /**
     * aync function to generate a graph with the given generator and parameters
     *
     * @param generator concrete graph generator
     * @param input list of parameters with the entered values for the generator
     * @returns generated graph
     */
    async getGeneratedGraph(
        generator: string,
        input: ParameterValue[]
    ): Promise<Graph> {
        const response = await fetch(
            process.env.REACT_APP_BACKEND_URL +
                this.pathPrefix +
                "/" +
                generator,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(input),
            }
        );
        await HttpHandler.checkResponse(this.acceptingHttpStatus, response, "");
        const data = await response.json();

        return GraphController.convertGraph(data);
    }
}

