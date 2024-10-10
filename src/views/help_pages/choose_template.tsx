import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import imageShare from "./template.png";

export default function ChooseTemplate(): JSX.Element {
    return (
    <Card>
       <CardBody>
      <CardTitle tag="h1">Choose a Template</CardTitle>  
      <CardText>
        If you do not want to create your own graph, you can choose a preexisting template. There are many different graphs available.
      </CardText>
      <img
    alt="Share Animation"
    src={imageShare}
    width="20%"
  />
      </CardBody>
    </Card>);
}