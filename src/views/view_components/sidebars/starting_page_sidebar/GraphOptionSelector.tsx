import { Dispatch, ReactNode, SetStateAction } from "react";
import { Button, ButtonGroup } from "reactstrap";
import Edge from "../../../../model/graph/Edge";
import Graph from "../../../../model/graph/Graph";
import Node from "../../../../model/graph/Node";
import { GraphEditMode } from "../../../2DVisualization/GraphVisualizationTwoD";
import { ViewStyleEnum } from "../../../2DVisualization/ViewStyleEnum";
import GraphEditorSideBar from "../graph_editor/GraphEditorSideBar";
import GenerateGraphMenu from "./GenerateGraphMenu";
import GraphUploadMenu from "./GraphUploadMenu";
import GraphTemplateMenu from "./GraphTemplateMenu";
import { StorageObject } from "../../../StartingPageView";

/**
 * represents the props of {@link GraphOptionSelector}
 */
interface Props {
    sessionId: number;
    setGraph: (graph: Graph) => void;

    graph: Graph;
    setUpdateGraph: () => void;
    view: ViewStyleEnum;
    setView: Dispatch<SetStateAction<ViewStyleEnum>>;
    graphEditMode: GraphEditMode;
    setGraphEditMode: (graphEditMode: GraphEditMode) => void;
    selectedNodes: Node[];
    inputFieldGraphOption: GraphOptions;
    setInputFieldGraphOption: Dispatch<SetStateAction<GraphOptions>>;
    setSelectMode: (bool: boolean) => void;
    storageObject: StorageObject;
    markedEdge?: Edge;
}

/**
 * This enum represents the different options to create / edit a graph.
 */
export enum GraphOptions {
    HIDDEN,
    CREATE_EDIT,
    GENERATE,
    TEMPLATE,
    UPLOAD,
}

/**
 * This react component represents the graph option selector.
 * The graph option selector serves a menu to create / edit a graph.
 *
 * @param props
 *
 * @returns graph option selector
 *
 * @author David Benedikt
 */
export default function GraphOptionSelector(props: Props) {
    // order needs to be the same like in GraphOptions
    const inputFields: ReactNode[] = [
        <></>, //HIDDEN
        <div>
            <br />
            <GraphEditorSideBar
                sessionId={props.sessionId}
                graph={props.graph}
                setUpdateGraph={props.setUpdateGraph}
                view={props.view}
                setView={props.setView}
                graphEditMode={props.graphEditMode}
                setGraphEditMode={props.setGraphEditMode}
                selectedNodes={props.selectedNodes}
                setSelectMode={(boolean) => {}}
                storageObject={props.storageObject}
                markedEdge={props.markedEdge}
            />
        </div>, //CREATE
        <div>
            <br />
            <GenerateGraphMenu
                sessionId={props.sessionId}
                setGraph={props.setGraph}
            />
        </div>, // CHOOSE
        <div>
            <br />
            <GraphTemplateMenu
                sessionId={props.sessionId}
                setGraph={props.setGraph}
            />{" "}
        </div>, // UPLOAD
        <div>
            <br />
            <GraphUploadMenu
                sessionId={props.sessionId}
                setGraph={props.setGraph}
            />{" "}
        </div>,
    ];

    /**
     * This function handles the change in the selcted graph options.
     *
     * @param fieldNumber
     *
     */
    const handleInputFieldChange = (fieldNumber: GraphOptions) => {
        if (props.inputFieldGraphOption === fieldNumber) {
            props.setInputFieldGraphOption(GraphOptions.HIDDEN);
        } else {
            props.setInputFieldGraphOption(fieldNumber);
        }
    };

    return (
        <div>
            <ButtonGroup>
                <Button
                    name='edit_graph_button'
                    color="primary"
                    outline
                    title='edit the current graph'
                    onClick={() =>
                        handleInputFieldChange(GraphOptions.CREATE_EDIT)
                    }
                    active={
                        props.inputFieldGraphOption === GraphOptions.CREATE_EDIT
                    }
                >
                    Edit Graph
                </Button>
                <Button
                    name="generate_graph_mode_button"
                    color="primary"
                    title='generate a graph using a graph generator'
                    outline
                    onClick={() =>
                        handleInputFieldChange(GraphOptions.GENERATE)
                    }
                    active={
                        props.inputFieldGraphOption === GraphOptions.GENERATE
                    }
                >
                    Generate Graph
                </Button>
                <Button
                    name='choose_template_graph_button'
                    color="primary"
                    outline
                    title='choose an existing graph'
                    onClick={() =>
                        handleInputFieldChange(GraphOptions.TEMPLATE)
                    }
                    active={
                        props.inputFieldGraphOption === GraphOptions.TEMPLATE
                    }
                >
                    Choose Template
                </Button>
                <Button
                    name='upload_graph_mode_button'
                    color="primary"
                    title='upload your own graph'
                    outline
                    onClick={() => handleInputFieldChange(GraphOptions.UPLOAD)}
                    active={props.inputFieldGraphOption === GraphOptions.UPLOAD}
                >
                    Upload Graph
                </Button>
            </ButtonGroup>
            <div>{inputFields[props.inputFieldGraphOption]}</div>
        </div>
    );
}

