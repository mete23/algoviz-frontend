import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

interface BackToEditProps {
    resetAnimation: () => void;
}

/**
 * Navigation button to go back to edit-mode
 *
 * @author Tobi
 * @version 1.0
 *
 */
export default function BackToEdit(props: BackToEditProps): JSX.Element {
    const navigate = useNavigate();

    const handleClick = () => {
        props.resetAnimation();
        navigate("/edit");
    }

    return (
        <div>
            <Button
                name='back_to_edit_mode_button'
                color="primary"
                outline
                onClick={handleClick
                }
            >
                Back To Edit-Mode
            </Button>
        </div>
    );
}

