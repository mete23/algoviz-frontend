import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "reactstrap";
import TemplateGraphController from "../../../../controller/graph/TemplateGraphController";
import Graph from "../../../../model/graph/Graph";

/**
 * represents a stored graph in database
 */
export interface StoredGraph {
    id: number;
    name: string;
    filePath: string;
}

/**
 * represents the props of {@link GraphTemplateMenu}
 */
interface Props {
    sessionId: number;
    setGraph: (graph: Graph) => void;
}

/**
 * This react component renders a menu to select a graph template.
 * It serves a dropdown menu with all stored graph templates.
 * When a graph template is selected, the graph is loaded and set in the frontend.
 *
 * @param props
 *
 * @returns select graph template menu
 *
 * @author David
 */
export default function GraphTemplateMenu(props: Props) {
    /**
     * state to store the template graphs
     */
    const [templateGraphs, setTemplateGraphs] = useState<StoredGraph[]>([]);

    /**
     * state to store the error message
     */
    const [errorMessage, setErrorMessage] = useState<string>("");

    const templateGraphController: TemplateGraphController =
        new TemplateGraphController();

    /**
     * fetches the stored graphs from the backend
     */
    useEffect(() => {
        async function fetchGraphs(): Promise<void> {
            const data: StoredGraph[] = [];
            try {
                const templatedGraphs: string[] =
                    await templateGraphController.getTemplatedGraphId();

                for (const templatedGraph of templatedGraphs) {
                    let graph: StoredGraph =
                        await templateGraphController.getTemplateGraphCard(
                            templatedGraph
                        );
                    data.push(graph);
                }
            } catch (error: any) {
                setErrorMessage(error.message);
            }
            setTemplateGraphs(data);
        }

        fetchGraphs();
    }, []);

    /**
     * This function fetches the graph template from the backend and sets it in the frontend.
     * selcted
     * @param e the change event of the drop down menu
     */
    const setTemplateGraph = async (e: ChangeEvent<HTMLInputElement>) => {
        const graph: Graph | undefined =
            await templateGraphController.getTemplateGraph(e.target.value);
        if (graph !== undefined) {
            props.setGraph(graph);
        }
    };

    return (
        <Input
            name='choose_template_graph_selector'
            type="select"
            defaultValue=""
            title='select the template graph'
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTemplateGraph(e)}
        >
            <option hidden value="">
                Please select a template
            </option>
            {templateGraphs.map((option: StoredGraph) => (
                <option key={option.id} value={option.id}>
                    {option.name}
                </option>
            ))}
        </Input>
    );
}

