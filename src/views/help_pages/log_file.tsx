import { Card, CardImg, CardBody, CardTitle, CardText } from "reactstrap";
import SyntaxHighlighter from 'react-syntax-highlighter';


/**
 * Log File
 *
 * @returns help view
 *
 * @author Tim
 * @version 0.1
 */
export default function LogFile(): JSX.Element {

    const  file = `graph G{
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
 }
 ###
 node:1:color:#ff00ff
 node:1:label:0
 ###
 node:2:coordinates:0.5:0.5
 edge:1:color:#ff8000
 ###
 removeNode:2
 ###
 addNode:6:0.5:1
 addEdge:7:3:6
 ###
 removeEdge:4

 `
    return (
  <Card >
    <CardBody>
      <CardTitle tag="h1">
      Upload a Log File
      </CardTitle>
      <CardText>
      If you want to visualize your own algorithm you can upload your own log file.
      </CardText>
      <CardText>
      A log file consists of two parts. The first part of the log file contains the graph on which the algorithm is executed. 
      The second part contains the execution steps of the algorithm. 
      The two parts are separated by <b>###</b>. It is also possible to upload both parts as separate files. 
      </CardText>
      <CardText>
      The execution steps of the second part are separated by ###.
       An execution step consists of several instruction. Each instruction must be in a separate line. 
      </CardText>
      <CardText>
        The following commands are available: 
      </CardText>
      <CardText>
      <b>node:<i>id</i>:color:<i>hexadecimal color</i></b><br/>Changes the color of a node.
      </CardText>
      <CardText>
    <b>node:<i>id</i>:label:<i>new label</i></b>
    <br/>
    Changes the label of a node.
    </CardText>
      <CardText>
    <b>node:<i>id</i>:coordinates:<i>x-coordinate</i>:<i>y-coordinate</i></b>
    <br/>
    Changes the coordinates of a node. The coordinates refer to the relative position and must therefor have a value between 0 and 1.
    </CardText>
      <CardText>
    <b>edge:<i>id</i>:color:<i>hexadecimal color</i></b>
    <br/>
    Changes the color of an edge.
    </CardText>
      <CardText>
    <b>addNode:<i>id</i>:<i>x-coordinate</i>:<i>y-coordinate</i></b>
    <br/>
    Adds a new node. The coordinates refer to the relative position and must therefor have a value between 0 and 1.
    </CardText>
      <CardText>
    <b>removeNode:<i>id</i></b>
    <br/>
    Removes a node.
    </CardText>
      <CardText>
    <b>addEdge:<i>id first node</i>:<i>id second node</i>:weight</b>
    <br/>
    Adds a new edge. If the graph is directed the edge will point from the second node to the first node. If the graph is directed the edge will have a certain weight.
    </CardText>
      <CardText>
    <b>removeEdge:<i>id</i></b>
    <br/>
    Removes an edge.
    </CardText>
    <CardText>
    A log file might looks like this:
    </CardText>
    <CardText>
    <SyntaxHighlighter showLineNumbers={true}>
        {file}
    </SyntaxHighlighter>
    </CardText>
    </CardBody>
  </Card>
  
    );
}