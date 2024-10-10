import SyntaxHighlighter from "react-syntax-highlighter";
import { Card, CardText, CardTitle } from "reactstrap";

export default function TikZExport(): JSX.Element {
    const fileCompact = `\\usetikzlibrary{arrows, automata}
\\begin{tikzpicture}[- >, >= stealth', node distance = 2.8 cm, semithick]
\\node[circle, fill={rgb:red,255;green,200;blue,0}, inner sep=4pt , accepting] (1) at(0,6) {};
\\node[circle, fill=black, inner sep=4pt] (2) at(3,0) {};

\\draw[->] (1) edge[above, draw={rgb:red,255;green,0;blue,0}] (2);
\\end{tikzpicture}`;
    const openingBracket = "{";
    const closingBracket = "}";
    return (
        <Card>
            <CardTitle tag="h1">Download an Animation as TikZ File</CardTitle>
            <CardText>
                You can download each step of the animation as a TikZ file. The
                files can be integrated into a LaTeX document with{" "}
                <b>
                    \include{openingBracket}
                    <i>fileName</i>
                    {closingBracket}
                </b>{" "}
                <br />
                For the integration, there are no additional packages needed.
                <br />
            </CardText>
            <CardText>
                The TikZ file contains the graph with the edges and nodes.
                <br />
                The graph does NOT look exactly like the graph in the animation,
                because the distances between the nodes were scaled to fit the
                TikZ picture.
                <br />
                The size of the TikZ picture is allways 12cm x 18cm.
            </CardText>
            <CardText>
                You can download the animatoin in the big as well as in the
                compact statement type. To select the statement type, you can
                use the dropdown menu in the animation view.
                <br />
                You can also download the animation several times with different
                settings.
            </CardText>
            <CardText>
                You can choose, which files you want to download. For this you
                can enter the numbers of the steps you want to download in the
                input field. You can also enter a range of steps.
                <br />
                The counting starts with 1. The file <i>step0</i> contains the
                unmodified graph.
                <br />
                For example, you can enter <b>1 - 3 + 5 - 7 + 9</b> to download
                steps 1, 2, 3, 5, 6, 7, 9. Empty spaces are ignored.
            </CardText>
            <CardText>
                {" "}
                A TikZ file in the compact view might looks like this:
            </CardText>
            <SyntaxHighlighter showLineNumbers={true}>{fileCompact}</SyntaxHighlighter>
        </Card>
    );
}

