import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import imageShare from "./generate.png";

export default function GenerateGraph(): JSX.Element {
    return (
    <Card>
       <CardBody>
      <CardTitle tag="h1">Geneate a Graph with KaGen</CardTitle>  
      <CardText>
        You can generate your own graphs with KaGen. You have to select a generator and set the neceassary parameters. 
        After you have clicked the <i>Generate Graph</i> button you will be able to enjoy your own graph.
      </CardText>
      <img
    alt="Generate Graph"
    src={imageShare}
    width="20%"
  />
      </CardBody>
    </Card>);
}