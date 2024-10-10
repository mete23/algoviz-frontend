import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import imageShare from "./changeView.png";

export default function ChangeView(): JSX.Element {
    return (
    <Card>
       <CardBody>
      <CardTitle tag="h1">Change View</CardTitle>  
      <CardText>
        You can change the view anytime you want. You can switch to the compact view, which will hide the labels of the nodes and the weights of the edges. The nodes will appear smaller and especially big graphs will appear better.
      </CardText>
      <img
    alt="Change View"
    src={imageShare}
    width="20%"
  />
      </CardBody>
    </Card>);
}