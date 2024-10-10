import { Dispatch, SetStateAction } from "react";
import SideBar from "../Sidebar";
import { Button, ButtonGroup, FormGroup, Input, Label } from "reactstrap";
import {
    BsPause,
    BsPlay,
    BsSkipEnd,
    BsSkipStart,
    BsRewind,
} from "react-icons/bs";
import { ViewStyleEnum } from "../../../2DVisualization/ViewStyleEnum";
import { ChangeView } from "../graph_editor/ChangeView";
import ShareAnimationMenu from "./ShareAnimationMenu";
import DownloadAnimationHandler from "./DownloadAnimationHandler";
import BackToEdit from "./BackToEdit";

/**
 * The props for the sidebar
 *
 * @param speed the current speed of the animation as number
 * @param sessionId the id of the current session as number
 * @param setViewStyle the function to set the view style
 * @param setSpeed the function to set the speed
 * @param viewStyle the current view style as ViewStyleEnum
 * @param skipClicked the function to skip the current animation step
 * @param stopClicked the function to stop the animation
 * @param hasNext if the animation has a next step
 * @param executed if the animation has been executed *
 */
export interface GraphAnimationSideBarProps {
    speed: number;
    sessionId: number;
    sharedAnimationLink: string;
    setViewStyle: Dispatch<SetStateAction<ViewStyleEnum>>;
    setSpeed: Dispatch<SetStateAction<number>>;
    setSharedAnimationLink: Dispatch<SetStateAction<string>>;
    viewStyle: ViewStyleEnum;
    skipClicked: () => void;
    stopClicked: () => void;
    backClicked: () => void;
    hasNext: boolean;
    executed: boolean;
    resetAnimation: () => void;
}

/**
 * The sidebar for the animation view
 *
 * @author: Tobias
 * @version: 1.0
 *
 * @param props the props for the sidebar
 */
export default function AnimationSidebar(props: GraphAnimationSideBarProps) {
    var lastSpeed = 1;

    /**
     * Sets the speed of the animation
     * @param speed the speed to set
     */
    const setSpeed = (speed: number) => {
        props.setSpeed(speed);
        if (speed > 0) {
            lastSpeed = speed;
        }
    };

    /**
     * Handles the click on the play/pause button
     */
    const playClicked = () => {
        props.speed > 0 ? setSpeed(0) : setSpeed(lastSpeed);
    };

    /**
     * Handles the click on the skip button
     */
    const skipClicked = () => {
        props.skipClicked();
    };

    /**
     * Handles the click on the stop button
     */
    const stopClicked = () => {
        props.stopClicked();
    };

    /**
     * Handles the click on the back button
     */
    const backClicked = () => {
        props.backClicked();
    };

    return (
        <div>
            <SideBar
                elements={[
                    <ChangeView
                        viewStyle={props.viewStyle}
                        setView={props.setViewStyle}
                    />,
                    <div>
                        <ButtonGroup style={{ width: "100%" }}>
                            <Button color={"primary"} 
                            title="restart animation"
                            onClick={stopClicked}>
                                <BsRewind />
                            </Button>
                            <Button 
                            name='one_step_back_button'
                            color="primary" 
                            title="go one step back"
                            onClick={backClicked}>
                                <BsSkipStart />
                            </Button>
                            <Button
                                color={props.speed > 0 ? "success" : "primary"}
                                title="play animation"
                                onClick={playClicked}
                            >
                                {props.speed > 0 ? <BsPause /> : <BsPlay />}
                            </Button>
                            <Button 
                                name='one_step_further_button'
                                title="go one step further"
                                color="primary"
                                onClick={skipClicked}>
                                <BsSkipEnd />{" "}
                            </Button>
                        </ButtonGroup>
                    </div>,
                    <FormGroup>
                        <Label for="exampleRange">
                            Current Speed: {props.speed}{" "}
                            {props.speed > 0 ? "Playing" : "Paused"}
                        </Label>

                        <Input
                            title="set play speed"
                            id="AnimationSpeed"
                            name="range"
                            type="range"
                            min={0}
                            max={15}
                            step={1}
                            value={props.speed}
                            onChange={(e) => {
                                let currentSpeed = parseFloat(e.target.value);
                                setSpeed(currentSpeed);
                            }}
                        />
                    </FormGroup>,
                    <ShareAnimationMenu 
                        sessionId={props.sessionId}
                        sharedAnimationLink={props.sharedAnimationLink}
                        setSharedAnimationLink={props.setSharedAnimationLink}
                    />,
                    <DownloadAnimationHandler sessionId={props.sessionId} />,
                    <BackToEdit resetAnimation={props.resetAnimation}/>
                ]}
            />
        </div>
    );
}

