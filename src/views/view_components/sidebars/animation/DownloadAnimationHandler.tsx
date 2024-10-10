import { useState } from "react";
import { Button } from "reactstrap";
import DownloadAnimation from "./DownloadAnimation";

interface DownloadAnimationProps {
    sessionId: number;
}

/**
 * This component is used to handle the download animation button.
 * It toggles the visibility of the DownloadAnimation component.
 *
 * @author Benedikt
 * @version 1.0
 *
 * @param props the sessionId of the current session as number
 */
export default function DownloadAnimationHandler(
    props: DownloadAnimationProps
) {
    const fields = [<></>, <DownloadAnimation sessionId={props.sessionId} />];

    const [selected, setSelected] = useState(false);

    return (
        <div>
            <Button
                color="primary"
                outline
                onClick={(e) => {
                    setSelected(!selected);
                }}
                active={selected}
            >
                Export Animation
            </Button>
            {selected ? fields[1] : fields[0]}
        </div>
    );
}

