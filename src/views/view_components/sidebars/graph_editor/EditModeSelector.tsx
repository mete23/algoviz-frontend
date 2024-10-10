import React, { useEffect } from "react";
import { Button, ButtonGroup } from "reactstrap";
import { GraphEditMode } from "../../../2DVisualization/GraphVisualizationTwoD";
import { StorageObject } from "../../../StartingPageView";

interface Props {
    setGraphEditMode: (editMode: GraphEditMode) => void;
    graphEditMode: number;
    setSelectMode: (bool: boolean) => void;
    storageObject: StorageObject;
}
export default function (props: Props): JSX.Element {
    useEffect(() => {}, [props.storageObject.graphEditMode]);

    function rerenderThis() {
        setState(rerender + 1);
    }

    const [rerender, setState] = React.useState<number>(0);

    return (
        <ButtonGroup>
            <Button
                color="primary"
                outline
                title="select node or edge"
                onClick={() => {
                    props.storageObject.graphEditMode = GraphEditMode.SELECT;
                    rerenderThis();
                }}
                active={
                    props.storageObject.graphEditMode === GraphEditMode.SELECT
                }
            >
                Select
            </Button>
            <Button
                color="primary"
                title="add node mode"
                outline
                onClick={() => {
                    props.storageObject.graphEditMode = GraphEditMode.ADD_NODE;
                    props.setSelectMode(false);
                    rerenderThis();
                }}
                active={
                    props.storageObject.graphEditMode === GraphEditMode.ADD_NODE
                }
            >
                Add Node
            </Button>
            <Button
                color="primary"
                outline
                title="remove node mode"
                onClick={() => {
                    props.storageObject.graphEditMode =
                        GraphEditMode.REMOVE_NODE;
                    props.setSelectMode(false);
                    rerenderThis();
                }}
                active={
                    props.storageObject.graphEditMode ===
                    GraphEditMode.REMOVE_NODE
                }
            >
                Remove Node
            </Button>
            <Button
                color="primary"
                outline
                title="add edge mode"
                onClick={() => {
                    props.storageObject.graphEditMode = GraphEditMode.ADD_EDGE;
                    props.setSelectMode(false);
                    rerenderThis();
                }}
                active={
                    props.storageObject.graphEditMode === GraphEditMode.ADD_EDGE
                }
            >
                Add Edge
            </Button>
            <Button
                color="primary"
                outline
                title="remove edge mode"
                onClick={() => {
                    props.storageObject.graphEditMode =
                        GraphEditMode.REMOVE_EDGE;
                    props.setSelectMode(false);
                    rerenderThis();
                }}
                active={
                    props.storageObject.graphEditMode ===
                    GraphEditMode.REMOVE_EDGE
                }
            >
                Remove Edge
            </Button>
        </ButtonGroup>
    );
}

