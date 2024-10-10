import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import imageShare from "./selectAlgorithm.png";

export default function SelectAlgorithm(): JSX.Element {
    return (
    <Card>
       <CardBody>
      <CardTitle tag="h1">Select an Algorithm</CardTitle>  
      <CardText>
        You can selct an algorithm to execute. The selected algorithm will be executed after you start the animation.
      </CardText>
      <img
    alt="Select Algorithm"
    src={imageShare}
    width="20%"
  />
      </CardBody>
    </Card>);
}