import { ReactNode, useState } from "react";
import { Button } from "reactstrap";
import UploadLogFileView from "./LogFileUploader";

interface Props {
    sessionId: number;
}

export default function LogFileUploader(props: Props) {
    const inputField: ReactNode[] = [
        <></>,
        <div>
            <br />
            <UploadLogFileView sessionId={props.sessionId} />
        </div>,
    ];
    const [inputFieldNumber, setInputFieldNumber] = useState<number>(0);

    const handleClick = () => {
        let newInputFieldNumber = (inputFieldNumber + 1) % 2;
        setInputFieldNumber(newInputFieldNumber);
    };

    return (
        <div>
            <Button
                name='log_file_upload_opener_button'
                color="primary"
                outline
                onClick={handleClick}
                active={inputFieldNumber === 1}
                title='upload your log file with the animation'
            >
                Upload Log File
            </Button>
            {inputField[inputFieldNumber]}
        </div>
    );
}

