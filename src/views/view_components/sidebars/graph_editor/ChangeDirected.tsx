import { Form, FormGroup, Label, Input } from "reactstrap";
import Graph from "../../../../model/graph/Graph";

interface GraphData {
    graph: Graph;
    setUpdateGraph: () => void;
}

export const ChangeDirected = ({
    graph,
    setUpdateGraph,
}: GraphData): JSX.Element => {
    const changeDirected = (): void => {
        graph.setDirected(!graph.isDirected());
        setUpdateGraph();
    };

    return (
        <Form>
            <FormGroup switch>
                <Input
                    type="switch"
                    role="switch"
                    title={graph.isDirected() ? "make graph undirected" : "make graph directed"}
                    defaultChecked={graph.isDirected()}
                    onClick={changeDirected}
                />
                <Label value> Directed </Label>
            </FormGroup>
        </Form>
    );
};
