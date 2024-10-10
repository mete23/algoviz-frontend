import { Card, CardImg, CardBody, CardTitle, CardText } from "reactstrap";
import SyntaxHighlighter from "react-syntax-highlighter";
/**
 * Log File
 *
 * @returns help view
 *
 * @author Benedikt
 * @version 1.0
 */
export default function GraphFileDot(): JSX.Element {
    const file = `graph G{
1[pos="0,0!"]
2[pos="0.2,0.3!"]
3[pos="1,0!"]
4[pos="0,0.3!"]
5[pos="0,1!"]
1--2
2--3
3--4
4--5
1--3
3--5
}`;

    const startingCharacter = "graph G {";
    const endingCharacter = "}";
    const directedEdge = "->";
    const undirectedEdge = "--";
    return (
        <Card>
            <CardBody>
                <CardTitle tag="h1">Upload a Graph File</CardTitle>
                <CardText>
                    If you want to use your own graph you can upload your own
                    graph file in the DOT format.
                    <br />
                    The graph file can be a normal text file, the file extension does not matter.
                </CardText>
                <CardText>
                    A graph file needs to start with <b>{startingCharacter}</ b> and
                    end with <b>{endingCharacter}</ b> both in a separate line. <br />
                    
                    The graph file is arranged in two parts.
                    The first part contains the nodes and the second part contains the edges.<br />
                    Notice that every node and edge needs to be in a separate
                    line. <br />
                    Empty spaces are ignored in the whole graph file.
                    Empty lines are forbidden.
                </CardText>
                <hr />
                <CardText>The nodes are defined in this format:</CardText>
                <CardText>
                    <b>
                        <i>nodeID</i> [ pos = " <i>x-coordinate</i>,{" "}
                        <i>y-coordinate</i> ! " ]
                    </b>
                    <br />
                </CardText>
                <CardText>
                    There are different formats for defining edges but all edges have to be in the same format.
                    <br></ br>
                    E.g. mix of directed and undirected edges is not allowed.
                </CardText>
                <CardText>
                    <b>
                        <i>sourceID</i> {undirectedEdge} <i>targetID</i>
                    </b>
                    <br />
                    An undirected, unweighted edge.
                </CardText>
                <CardText>
                    <b>
                        <i>sourceID</i> {undirectedEdge} <i>targetID</i> [
                        weight = <i>weight</i> ]
                    </b>
                    <br />
                    An undirected, weighted edge.
                </CardText>
                <CardText>
                    <b>
                        <i>sourceID</i> {directedEdge} <i>targetID</i>
                    </b>
                    <br />
                    An directed, unweighted edge.
                </CardText>
                <CardText>
                    <b>
                        <i>sourceID</i> {directedEdge} <i>targetID</i> [ weight
                        = <i>weight</i> ]
                    </b>
                    <br />
                    An directed, weighted edge.
                </CardText>
                <hr />
                <CardText>This is an example for a graph file according to the DOT format:</CardText>
                <SyntaxHighlighter showLineNumbers={true}>
                    {file}
                </SyntaxHighlighter>
                <br />
                <br />
            </CardBody>
        </Card>
    );
}

