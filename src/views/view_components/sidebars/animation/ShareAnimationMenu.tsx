import { Dispatch, SetStateAction, useState } from "react";
import { Button, Input, InputGroup, Tooltip } from "reactstrap";
import { AiOutlineCopy } from "react-icons/ai";
import StoredAnmationController from "../../../../controller/StoredAnimationController";

interface SharedAnimationProps {
    sessionId: number;
    sharedAnimationLink: string;
    setSharedAnimationLink: Dispatch<SetStateAction<string>>;
}

/**
 * Component to share the animation
 *
 * @author David
 * @version 1.0
 *
 * @param props the session id of the current session as number
 */
export default function ShareAnimationMenu(props: SharedAnimationProps) {
    const linkPrefix = process.env.REACT_APP_URL + "/shared-animation/";

    const [tooltipOpen, setTooltipOpen] = useState(false);

    /**
     * stores the animation in the database
     */
    const storeAnimation = () => {
        const copyToClipboard = (text: string) => {
            navigator.clipboard.writeText(text);
            setTooltipOpen(true);
            setTimeout(() => {
                setTooltipOpen(false);
            }, 1000);
        }

        if (props.sharedAnimationLink !== "") {
            copyToClipboard(props.sharedAnimationLink);
            return;
        }

        const fetchStoredAnimationId = async () => {
            const storedAnimationController: StoredAnmationController =
                new StoredAnmationController();
            const sharedAnimationId: number =
                await storedAnimationController.storeAnimation(props.sessionId);
            copyToClipboard(linkPrefix + sharedAnimationId);
            props.setSharedAnimationLink(linkPrefix + sharedAnimationId);
        };

        fetchStoredAnimationId();

    };

    return (
        <div>
            <InputGroup>
                <Input
                    placeholder="share animation!"
                    value={props.sharedAnimationLink}
                    readOnly
                />
                <Button
                    id="shareAnimationButton"
                    className="w-25"
                    color="primary"
                    onClick={() => {
                        storeAnimation();
                    }}
                >
                    <AiOutlineCopy />
                    Share
                </Button>
                <Tooltip
                    placement="right"
                    trigger="click"
                    target="shareAnimationButton"
                    isOpen={tooltipOpen}
                >
                    Copied!
                </Tooltip>
            </InputGroup>
        </div>
    );
}
