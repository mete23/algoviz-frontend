import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";
import StoredAnmationController from "../controller/StoredAnimationController";
import VisError from "./view_components/options/OptionError";

/**
 * object of the sessionData as props
 */
interface LoadStoredAnimationProps {
    sessionId: number;
}

/**
 * This view renders a loading page for a stored animation.
 * This view is displayed when the user clicks on a link to a stored animation.
 * The user is redirected to the animation view after the animation is loaded in the backend.
 *
 * @param props
 *
 * @returns
 */
export default function LoadStoredAnimationView(
    props: LoadStoredAnimationProps
) {
    const ERROR_MESSAGE: string =
        "Error: Shared animation id is incorrect. Animation can't be loaded.";

    /**
     * id of the stored animation
     */
    const { sharedAnimationId } = useParams();

    /**
     * error message
     */
    const [errorMessage, setErrorMessage] = useState<string>("");

    /**
     * function to navigate to another view
     */
    const navigate = useNavigate();

    /**
     * loads the stored animation in the backend after the session id is set
     */
    useEffect(() => {
        const setAnimation = async () => {
            if (props.sessionId === 0 || sharedAnimationId === undefined) {
                return;
            }
            const storedAnimationController: StoredAnmationController =
                new StoredAnmationController();

            try {
                await storedAnimationController.setAnimation(
                    props.sessionId,
                    +sharedAnimationId
                );
                navigate("/animation");
            } catch (error: any) {
                setErrorMessage(ERROR_MESSAGE);
            }
        };
        setAnimation();
    }, [props.sessionId]);

    switch (errorMessage) {
        case "":
            return (
                <div>
                    <h1>Animation is loading</h1>
                    <Spinner>Loading...</Spinner>
                </div>
            );
        default:
            return (
                <div>
                    <br />
                    <VisError errorMessage={errorMessage}></VisError>
                </div>
            );
    }
}
