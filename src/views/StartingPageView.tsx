import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AlgorithmSelectionController from "../controller/algorithm/AlgorithmSelectionController";
import GraphController from "../controller/graph/GraphController";
import Edge from "../model/graph/Edge";
import Graph from "../model/graph/Graph";
import Node from "../model/graph/Node";
import { ProgramStep } from "./view_components/navbars/GeneralNavBar";
import GraphVisualizationTwoD, {
    GraphEditMode,
} from "./2DVisualization/GraphVisualizationTwoD";
import { ViewStyleEnum } from "./2DVisualization/ViewStyleEnum";
import OptionError from "./view_components/options/OptionError";
import { GraphOptions } from "./view_components/sidebars/starting_page_sidebar/GraphOptionSelector";
import StartingPageSidebar from "./view_components/sidebars/starting_page_sidebar/StartingPageSidebar";

/**
 * Represents the storage object of the StartingPageView component.
 */
export class StorageObject {
    public graphEditMode: GraphEditMode = GraphEditMode.SELECT;
}

/**
 * Represents the props of the StartingPageView component.
 */
interface Props {
    sessionId: number;
    setProgramStep: (step: ProgramStep) => void;
}

/**
 * This react component represents the welcome page of the application.
 * The user has different options to create a graph and select an algorithm.
 *
 * @returns welcome page view
 *
 * @param props props of the component
 *
 * @author David, Benedikt, Tim
 */
export default function StartingPageView(props: Props) {
    const sessionId: number = props.sessionId;
    const algorithmSelectionController = new AlgorithmSelectionController();
    const graphController = new GraphController();
    const navigate = useNavigate();

    const [selectMode, setSelectMode] = useState<boolean>(false);

    const [graph, setGraph] = useState<Graph>(new Graph([], [], false, false));
    const [algorithm, setAlgorithm] = useState<string>("");
    const [algoDescription, setAlgoDescription] = useState<string>("");
    const [view, setView] = useState<ViewStyleEnum>(ViewStyleEnum.BIG);
    const [updateGraph, setUpdateGraph] = useState<number>(0);

    const [inputFieldNumberGraphOption, setInputFieldNumberGraphOption] =
        useState<GraphOptions>(GraphOptions.HIDDEN);

    const setUpdate = (): void => {
        setUpdateGraph(updateGraph + 1);
    };

    const [errorMessage, setErrorMessage] = useState<string>("");

    const fetchGraph = async (): Promise<void> => {
        const graphController = new GraphController();
        let newGraph: Graph | undefined = undefined;
        try {
            newGraph = await graphController.getGraph(sessionId);
        } catch (error: any) {
            setErrorMessage(error.message);
            return;
        }

        // graph does exist in backend
        if (newGraph != undefined) {
            setGraph(newGraph);
        }
    };

    useEffect(() => {
        props.setProgramStep(ProgramStep.SELECT_GRAPH);
        if (sessionId == 0) {
            return;
        }
        fetchGraph();
    }, [sessionId]);

    /**
     * this part is for the state of visualizing/ editing the graph
     */

    const [graphEditMode, setGraphEditMode] = React.useState<GraphEditMode>(
        GraphEditMode.SELECT
    );

    const [selectedNodes, setSelectedNodes] = useState<Node[]>([]);
    const [selectedEdge, setSelectedEdge] = useState<Edge | undefined>(
        undefined
    );

    const handleChangeAnimation = async () => {
        try {
            // post algorithm
            await algorithmSelectionController.setAlgorithm(
                sessionId,
                algorithm
            );

            // post graph
            await graphController.setGraph(sessionId, graph);
            navigate("/animation");
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    };

    const handleEditModeChange = useCallback(
        (editMode: GraphEditMode) => {
            setGraphEditMode(editMode);
        },
        [setGraphEditMode]
    );

    const handleChangeAlgorithm = useCallback(
        (algorithm: string) => {
            setAlgorithm(algorithm);
        },
        [setAlgorithm, algorithm]
    );

    const handleGraphChange = useCallback(
        (graph: Graph) => {
            setGraph(graph);
        },
        [setGraph]
    );

    const handleAlgDescriptioChange = useCallback((algoDescription: string) => {
        setAlgoDescription(algoDescription);
        console.log(algoDescription);
    }, []);

    const [updateLabelEditor, setUpdateLabelEditor] = useState<boolean>(false);

    const [storageObject, setStorageObject] = useState<StorageObject>(
        new StorageObject()
    );

    return (
        <div className="GraphWrapper">
            <StartingPageSidebar
                sessionId={props.sessionId}
                setGraph={handleGraphChange}
                handleChangeAlgorithm={handleChangeAlgorithm}
                algorithmSelected={algorithm}
                setAlgorithmDescription={handleAlgDescriptioChange}
                algorithmDescription={algoDescription}
                handleClickAnimation={handleChangeAnimation}
                graph={graph}
                setUpdateGraph={setUpdate}
                view={view}
                setView={setView}
                graphEditMode={graphEditMode}
                setGraphEditMode={handleEditModeChange}
                selectedNodes={selectedNodes}
                inputFieldNumberGraphOption={inputFieldNumberGraphOption}
                setInputFieldNumberGraphOption={setInputFieldNumberGraphOption}
                updateLabelEditor={updateLabelEditor}
                setSelectMode={setSelectMode}
                storageObject={storageObject}
                markedEdge={selectedEdge}
            />
            <div className="elementsWrapper">
                <OptionError errorMessage={errorMessage}></OptionError>

                <GraphVisualizationTwoD
                    graph={graph}
                    viewStyle={
                        view === "BIG"
                            ? ViewStyleEnum.BIG
                            : ViewStyleEnum.COMPACT
                    }
                    updateGraph={updateGraph}
                    graphEditMode={graphEditMode}
                    setGraphEditMode={setGraphEditMode}
                    markedNodesArray={selectedNodes}
                    setMarkedNodes={setSelectedNodes}
                    // setSelectedEdge={setSelectedEdge}
                    markedEdge={selectedEdge}
                    setMarkedEdge={setSelectedEdge}
                    //   setUpdateDone={setUpdateDone}
                    setUpdateLabelEditor={setUpdateLabelEditor}
                    //selectMode={selectMode}
                    storageObject={storageObject}
                />
            </div>
        </div>
    );
}

