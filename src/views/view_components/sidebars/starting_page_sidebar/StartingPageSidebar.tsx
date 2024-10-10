import { Dispatch, SetStateAction } from "react";
import { Button } from "reactstrap";
import Edge from "../../../../model/graph/Edge";
import Graph from "../../../../model/graph/Graph";
import Node from "../../../../model/graph/Node";
import { GraphEditMode } from "../../../2DVisualization/GraphVisualizationTwoD";
import { ViewStyleEnum } from "../../../2DVisualization/ViewStyleEnum";
import AlgorithmSelector from "./AlgorithmSelector";
import GraphOptionSelector, { GraphOptions } from "./GraphOptionSelector";
import LogFileUploader from "./LogFileUploadHandler";
import Sidebar from "../Sidebar";
import { StorageObject } from "../../../StartingPageView";

/**
 * props of {@link StartingPageSidebar}
 */
interface Props {
    sessionId: number;
    handleClickAnimation: () => void;
    handleChangeAlgorithm: (algorithmId: string) => void;
    algorithmSelected: string;
    algorithmDescription: string;
    setAlgorithmDescription: (description: string) => void;
    setGraph: (graph: Graph) => void;
    inputFieldNumberGraphOption: GraphOptions;
    setInputFieldNumberGraphOption: Dispatch<SetStateAction<GraphOptions>>;

    graph: Graph;
    setUpdateGraph: () => void;
    view: ViewStyleEnum;
    setView: Dispatch<SetStateAction<ViewStyleEnum>>;
    graphEditMode: GraphEditMode;
    setGraphEditMode: (graphEditMode: GraphEditMode) => void;
    selectedNodes: Node[];
    updateLabelEditor: boolean;
    setSelectMode: (bool: boolean) => void;
    storageObject: StorageObject;
    markedEdge?: Edge;
    setSelectedEdge?: (edge: Edge) => void;
}

/**
 * This react component represents the starting page sidebar.
 * The starting page sidebar contains a menu to create / edit a graph, to select an algorithm or to upload a log file.
 *
 * @param props
 *
 * @returns starting page sidebar
 *
 * @author David, Tim, Benedikt
 */
export default function StartingPageSidebar(props: Props) {
    return (
        <div>
            <Sidebar
                elements={[
                    <GraphOptionSelector
                        sessionId={props.sessionId}
                        setGraph={props.setGraph}
                        graph={props.graph}
                        setUpdateGraph={props.setUpdateGraph}
                        view={props.view}
                        setView={props.setView}
                        graphEditMode={props.graphEditMode}
                        setGraphEditMode={props.setGraphEditMode}
                        selectedNodes={props.selectedNodes}
                        markedEdge={props.markedEdge}
                        inputFieldGraphOption={
                            props.inputFieldNumberGraphOption
                        }
                        setInputFieldGraphOption={
                            props.setInputFieldNumberGraphOption
                        }
                        setSelectMode={props.setSelectMode}
                        storageObject={props.storageObject}
                    />,
                    <AlgorithmSelector
                        handleChangeAlgorithm={props.handleChangeAlgorithm}
                        algorithmSelected={props.algorithmSelected}
                        algorithmDescription={props.algorithmDescription}
                        setAlgorithmDescription={props.setAlgorithmDescription}
                    />,
                    <Button
                        name='start_animation_button'
                        color="primary"
                        style={{ width: "98%" }}
                        onClick={props.handleClickAnimation}
                        title='start the animation with the current graph'
                    >
                        Start Animation
                    </Button>,
                    <LogFileUploader sessionId={props.sessionId} />,
                ]}
            />
        </div>
    );
}

