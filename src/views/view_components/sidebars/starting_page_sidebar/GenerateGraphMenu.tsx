import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "reactstrap";
import GenerateGraphController, {
    GeneratorOption,
    GeneratorParameter,
} from "../../../../controller/graph/GenerateGraphController";
import Graph from "../../../../model/graph/Graph";
import OptionError from "../../options/OptionError";
import { ParameterType } from "../../options/OptionFormularElement";
import OptionFromularView, { Formular } from "../../options/OptionFormularView";

/**
 * represents an entered paramter value
 */
export interface ParameterValue {
    type: string;
    value: string;
    kaGenParameter: KaGenParameter;
}

/**
 * represents a paramter from an option formular element
 */
export interface Parameter {
    command: string;
    description: string;
    parameterVariableType: string;
    minimum: number;
    maximum: number;
}

/**
 * represents a kagen parameter
 */
interface KaGenParameter {
    command: string;
}

/**
 * reprents the props of {@link GenerateGraphMenu}
 */
interface Props {
    sessionId: number;
    setGraph: (graph: Graph) => void;
}

/**
 * This react component renders a menu with a formular to generate a graph.
 *
 * @param sessionId the session id
 * @param setGraph the function to set the graph
 *
 * @returns menu view
 *
 * @author David, Benedikt
 */
export default function GenerateGraphMenu(props: Props) {
    const generateGraphController: GenerateGraphController =
        new GenerateGraphController();

    /**
     * stores the currently available graph generators
     */
    const [options, setgeneratorTypes] = useState<GeneratorOption[]>([]);

    /**
     * stored the selected graph generator
     */
    const [selectedGenerator, setSelectedGenerator] = useState("");

    /**
     * the input from the input formular
     */
    const [inputFields, setInputFields] = useState<Formular[]>([]);

    /**
     * stores the error message
     */
    const [errorMessage, setErrorMessage] = useState<string>("");

    /**
     * This function fetches all available generators.
     */
    useEffect(() => {
        async function fetchOptions(): Promise<void> {
            let generators: string[] = [];
            const options: GeneratorOption[] = [];
            try {
                generators = await generateGraphController.getGenerators();

                for (const generator of generators) {
                    const option: GeneratorOption =
                        await generateGraphController.getGeneratorOption(
                            generator
                        );
                    options.push(option);
                }
            } catch (error: any) {
                setErrorMessage(error.message);
            }

            setgeneratorTypes(options);
        }

        fetchOptions();
    }, []);

    /**
     * This function fetches all available parameters for the selected generator.
     */
    useEffect(() => {
        async function fetchOptions(): Promise<void> {
            if (selectedGenerator === "") {
                return;
            }

            const formularList: Formular[] = [];
            try {
                const parameterList: GeneratorParameter[] =
                    await generateGraphController.getGeneratorParams(
                        selectedGenerator
                    );
                for (const parameter of parameterList) {
                    let parameterTypeEnum: ParameterType =
                        ParameterType[
                            parameter.parameterVariableType as keyof typeof ParameterType
                        ];
                    formularList.push({
                        description: parameter.description,
                        type: parameterTypeEnum,
                        name: parameter.command,
                        minimum: parameter.minimum,
                        maximum: parameter.maximum,
                    });
                }
            } catch (error: any) {
                setErrorMessage(error.message);
            }

            setInputFields(formularList);
        }

        fetchOptions();
    }, [selectedGenerator]);

    /**
     * All entered paramters are send to the backend and the generated graph is set in the welcome page.
     *
     * @param input entered paramters
     */
    const handleInput = (
        input: Map<string, { value: string; type: string }>
    ) => {
        const parameterValues: ParameterValue[] = [];
        input.forEach((value, key) => {
            parameterValues.push({
                type: value.type,
                value: value.value,
                kaGenParameter: { command: key },
            });
        });

        const fetchOptions = async () => {
            if (selectedGenerator === "") {
                return;
            }
            let graph: Graph | undefined;
            try {
                graph = await generateGraphController.getGeneratedGraph(
                    selectedGenerator,
                    parameterValues
                );
            } catch (error: any) {
                setErrorMessage(error.message);
            }
            if (graph !== undefined) {
                props.setGraph(graph);
            }
        };

        fetchOptions();
    };

    return (
        <div>
            <Input
                type="select"
                defaultValue=""
                name="generator_selector"
                title='select the graph generator type'
                onInput={(e: ChangeEvent<HTMLInputElement>) => {
                    setSelectedGenerator(e.target.value);
                }}
            >
                <option hidden value="">
                    Please select a generator
                </option>
                {options.map((option: GeneratorOption) => (
                    <option
                        key={option.generatorType}
                        value={option.generatorType}
                    >
                        {option.generatorType}
                    </option>
                ))}
            </Input>
            <br />
            <OptionFromularView
                options={inputFields}
                handleInput={handleInput}
            />
            <OptionError errorMessage={errorMessage} />
        </div>
    );
}

