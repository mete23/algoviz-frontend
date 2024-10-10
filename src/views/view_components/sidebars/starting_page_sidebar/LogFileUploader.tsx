import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormGroup, FormText, Input, Label, Row } from "reactstrap";
import UploadLogfileController from "../../../../controller/UploadLogfileController";
import OptionError from "../../options/OptionError";

/**
 * @author Benedikt, Tobias
 * @version 1.0
 *
 * generates a JSX.Element to upload a logfile
 */

/**
 * object of the sessionData as props
 */
interface props {
    sessionId: number;
}

/**
 * generates a JSX.Element to upload a logfile
 *
 * @param prevProps properties to upload a logfile
 * @returns a JSX.Element to upload a logfile
 */
function UploadLogFileView(prevProps: props): JSX.Element {
    const fileInput = useRef<HTMLInputElement>(null);
    const lineSeperator = "###";
    const uploadLogfileController: UploadLogfileController =
        new UploadLogfileController();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [algorithmData, setAlgorithmData] = useState<string>("");
    const [graphData, setGraphData] = useState<string>("");
    const navigate = useNavigate();

    /**
     * function to handle the click on the upload button
     */
    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };

    /**
     * function to handle the change of the input field
     *
     * @param event event of the input field
     * @returns nothing
     */
    const handleChangeLogFile = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file: File | undefined = event.target.files?.[0];
        if (!file) {
            setErrorMessage("Upload failed!");
            return;
        }
        const fileReader = new FileReader();
        fileReader.readAsText(file, "UTF-8");
        fileReader.onload = async (e: ProgressEvent<FileReader>) => {
            const content: string | ArrayBuffer | null = fileReader.result;
            if (!content) {
                throw new Error("Log-file could not be read!");
            }
            uploadData(content?.toString());
        };
    };

    const handleChangeGraph = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file: File | undefined = event.target.files?.[0];
        if (!file) {
            setErrorMessage("Upload failed!");
            return;
        }
        const fileReader = new FileReader();
        fileReader.readAsText(file, "UTF-8");
        fileReader.onload = async (e: ProgressEvent<FileReader>) => {
            const content: string | ArrayBuffer | null = fileReader.result;
            if (!content) {
                throw new Error("Graph file could not be read!");
            }
            setGraphData(content?.toString());
            if (algorithmData !== "") {
                uploadData(content?.toString() + lineSeperator + algorithmData);
            }
        };
    };

    const handleChangeAlgorithm = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file: File | undefined = event.target.files?.[0];
        if (!file) {
            setErrorMessage("Upload failed!");
            return;
        }
        const fileReader = new FileReader();
        fileReader.readAsText(file, "UTF-8");
        fileReader.onload = async (e: ProgressEvent<FileReader>) => {
            const content: string | ArrayBuffer | null = fileReader.result;
            if (!content) {
                throw new Error("Algorithm file could not be read!");
            }
            setAlgorithmData(content?.toString());
            if (graphData !== "") {
                uploadData(graphData + lineSeperator + content?.toString());
            }
        };
    };

    const uploadData = async (logFile: string) => {
        try {
            const sessionId = prevProps.sessionId;
            await uploadLogfileController.uploadLogData(sessionId, logFile);
            navigate("/animation");
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div>
            <FormGroup>
                <Label for="logFile">Log File</Label>
                <Input
                    name='whole_log_file_upload_input'
                    id="logFile"
                    type="file"
                    onClick={handleClick}
                    onChange={handleChangeLogFile}
                    title='upload your log file containing the graph and the execution'
                />
            </FormGroup>
            <hr />
            <center> OR </center>
            <Row>
                <FormGroup>
                    <Label for="graph" 
                    >Graph file</Label>
                    <Input
                        id="graph"
                        type="file"
                        onClick={handleClick}
                        onChange={handleChangeGraph}
                        title='upload the graph file for the log file'
                    />
                    <Label for="algorithm">Algorithm file</Label>
                    <Input
                        id="algorithm"
                        type="file"
                        onClick={handleClick}
                        onChange={handleChangeAlgorithm}
                        title='upload the execution part of your log file'
                    />
                </FormGroup>
            </Row>
            <OptionError errorMessage={errorMessage} />
        </div>
    );
}

export default UploadLogFileView;

