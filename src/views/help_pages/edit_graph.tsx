import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import imageShare from "./edit_graph.png";

export default function EditGraph(): JSX.Element {
    return (
        <Card>
            <CardBody>
                <CardTitle tag="h1">Edit Graph</CardTitle>
                <CardText>
                    You can edit a graph by clicking on the edit button in the
                    top left corner.
                </CardText>
                <img alt="Edit Graph" src={imageShare} width="20%" />
                <hr />
                <CardText>
                    <b>Directed</b> <br />
                    Change the graph to a directed graph by clicking on the
                    switch. If the switch is on the left, the graph will be
                    undirected. <br />
                    If the switch is on the right, the graph will be directed.
                    <br />
                    If a graph is directed and you change it to undirected, the
                    edges will still store the direction. So you can change it
                    back to directed with the same direction.
                </CardText>
                <hr />
                <CardText>
                    <b>Weighted</b> <br />
                    Change the graph to a weighted graph by clicking on the
                    switch. If the switch is on the left, the graph will be
                    unweighted. <br />
                    If the switch is on the right, the graph will be weighted.
                    <br />
                    If a graph is weighted and you change it to unweighted, the
                    weights will still be stored in the graph object, but
                    ignored. So you can change it back to weighted with the same
                    weights.
                </CardText>
                <hr />
                <CardText>
                    <b>Select</b> <br />
                    Select a node or an edge by clicking on it. A selected node
                    is marked by a yellow circle in it. A selected edge will NOT
                    be marked. <br />
                    For a selected object you can change the label, respectifly
                    the weight.
                </CardText>
                <hr />
                <CardText>
                    <b>Add Node</b> <br />
                    Add a node by clicking at the place the node should be.
                </CardText>
                <hr />
                <CardText>
                    <b>Remove Node</b> <br />
                    Remove a node by clicking on it. If the node has edges, the
                    edges will be removed too.
                </CardText>
                <hr />
                <CardText>
                    <b>Add Edge</b> <br />
                    Add an edge by clicking on the first node and then on the
                    second node. The edge will be added between these two nodes.
                    The edge will have the direction from the first node to the
                    second node.
                </CardText>
                <hr />
                <CardText>
                    <b>Remove Edge</b> <br />
                    Remove an edge by clicking on it.
                </CardText>
                <hr />
                <CardText>
                    <b>Starting Node</b> <br />A selected node can be set as the
                    starting node by clicking on the button. The starting node
                    will be marked by a green circle in it. The mark will stay
                    until you change the starting node.
                </CardText>
                <br />
                <br />
            </CardBody>
        </Card>
    );
}

