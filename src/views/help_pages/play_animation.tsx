import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import imageShare from "./playAnimation.png";

export default function PlayAnimation(): JSX.Element {
    return (
    <Card>
       <CardBody>
      <CardTitle tag="h1">Visualize your Algorithm</CardTitle>  
      <CardText>
        You can execute the next step or undo the last step of an algorithm by cklicking the corresponding buttons. If you want to animate the algorithm you can click the play button. You can change the speed of the animation and pause the animation anytime you want. If you want to restart the animation you can click the left button.
      </CardText>
      <img
    alt="Animate Algorithm"
    src={imageShare}
    width="20%"
  />
      </CardBody>
    </Card>);
}