import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import imageShare from "./share.png";

export default function ShareAnimation(): JSX.Element {
    return (
    <Card>
       <CardBody>
      <CardTitle tag="h1">Share an Animation</CardTitle>  
      <CardText>
        After you have started the animation you can share the animation with other people. 
        Just click the share button and generate your own link. 
        Afterwards you can send the link anybody you like or you can just keep the link and access the animation anytime you want.
      </CardText>
      <img
    alt="Share Animation"
    src={imageShare}
    width="20%"
  />
      </CardBody>
    </Card>);
}