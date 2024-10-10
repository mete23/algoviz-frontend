import { Form, FormGroup, Label, Input } from "reactstrap";
import Graph from "../../../../model/graph/Graph";

interface GraphData {
    graph: Graph;
    setUpdateGraph: () => void;
}

export const ChangeWeighted = ({
    graph,
    setUpdateGraph,
}: GraphData): JSX.Element => {
    const changeWeighted = (): void => {
        graph.setWeighted(!graph.isWeighted());
        setUpdateGraph();
    };

    return (
        <Form>
            <FormGroup switch>
                <Input
                    type="switch"
                    role="switch"
                    title={graph.isWeighted() ? "make graph unweighted" : "make graph weighted"}
                    defaultChecked={graph.isWeighted()}
                    onClick={changeWeighted}
                />
                <Label value> Weighted </Label>
            </FormGroup>
        </Form>
    );
};
