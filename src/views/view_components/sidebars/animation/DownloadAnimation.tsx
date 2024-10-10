import { saveAs } from "file-saver";
import JSZip from "jszip";
import { useEffect, useState } from "react";
import { Button, Input, Label } from "reactstrap";
import { Event } from "three";
import TikZExportController from "../../../../controller/algorithm/TikZExportController";
import OptionError from "../../options/OptionError";

interface DownloadAnimationProps {
    sessionId: number;
}

export interface Generator {
    id: string;
    name: string;
}

/**
 * @author Benedikt
 * @version 1.0
 *
 * Generates a download button for the animation of the current session.
 *
 * @param props Properties of the DownloadAnimation component
 * @returns a JSX.Element to download the animation
 */
export default function DownloadAnimation(
    props: DownloadAnimationProps
): JSX.Element {
    // constants
    const folderName: string = "Animation" + props.sessionId;
    const dataNamePrefix: string = "step";
    const folderType: string = ".zip";
    const fileDataType: string = ".tex";
    const regexInputFiles: RegExp = new RegExp(
        "((\\d+-\\d+)|\\d*)(\\+((\\d+-\\d+)|\\d+))*"
    );

    // error messages
    const inputTooSmall: string = " must be greater than 0";
    const inputTooBig: string = " must be smaller than ";
    const startGreaterEnd: string = " must be smaller than ";
    const invalidInput: string = " must refere to a range of files";

    // controllers
    const tikzExportController: TikZExportController =
        new TikZExportController();

    // states
    const [generators, setGenerators] = useState<Generator[]>([]);
    const [generatorChosen, setGeneratorChosen] = useState<string>("");
    const [listSize, setListSize] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [filesInput, setFilesInput] = useState<string>("");
    const [placeHolder, setPlaceHolder] = useState<string>("");

    var filesChosen: number[] = [];

    useEffect(() => {
        async function fetchGenerators(): Promise<void> {
            try {
                const response = await tikzExportController.getGenerators();
                setGenerators(response);
                setGeneratorChosen(response[0].id);

                const size = await tikzExportController.getListSize(
                    props.sessionId
                );
                setListSize(size);

                if (size === 1) {
                    setPlaceHolder("1");
                } else {
                    const sizeMiddle = Math.floor(size / 2);
                    setPlaceHolder(
                        "1 - " +
                            sizeMiddle +
                            " + " +
                            (sizeMiddle + 1) +
                            " - " +
                            size
                    );
                }
            } catch (error: any) {
                setErrorMessage(error.message);
            }
        }
        fetchGenerators();
    }, []);

    /**
     * Handles the click on the download button.
     * Downloads the selected files as a zip file.
     */
    const handleClickDownload = async (): Promise<void> => {
        try {
            selectFilesChosen();
        } catch (error) {
            return;
        }

        var data: string[] = [];
        try {
            data = await tikzExportController.getExportAnimation(
                props.sessionId,
                generatorChosen
            );
        } catch (error: any) {
            setErrorMessage(error.message);
            return;
        }

        const zip: JSZip = new JSZip();

        for (let i: number = 0; i < data.length; i++) {
            if (filesChosen.includes(i)) {
                zip.file(dataNamePrefix + i + fileDataType, data[i]);
            }
        }

        const content: Blob = await zip.generateAsync({ type: "blob" });
        saveAs(content, folderName + folderType);
    };

    /**
     * Handles the change of the generator.
     * Saves the new generator.
     *
     * @param event The event that triggered the function
     */
    const handleChangeGenerator = (event: Event): void => {
        event.preventDefault();
        setGeneratorChosen(event.target.value);
    };

    /**
     * Handles the change of the input field for the files.
     * Saves the new input.
     *
     * @param event The event that triggered the function
     */
    const handleChangeFiles = (event: Event): void => {
        event.preventDefault();
        let input = event.target.value;
        if (input === "") {
            setFilesInput("");
        }
        input = input.replace(" ", "");
        let match = input.match(regexInputFiles);
        if (match && match[0] === input) {
            setFilesInput(input);
            setErrorMessage("");
        } else {
            setErrorMessage(input + invalidInput);
        }
    };

    /**
     * Selects the files that should be downloaded.
     */
    const selectFilesChosen = (): void => {
        filesChosen = [];
        if (filesInput === "") {
            for (let i: number = 0; i < listSize; i++) {
                filesChosen.push(i);
            }
            return;
        }

        const inputs: string[] = filesInput.split("+");

        for (let input of inputs) {
            if (input.includes("-")) {
                const range: string[] = input.split("-");
                const start: number = parseInt(range[0]) - 1;
                const end: number = parseInt(range[1]) - 1;

                // check if input is valid
                if (start > end) {
                    setErrorMessage(start + 1 + startGreaterEnd + (end + 1));
                    throw new Error();
                } else if (start >= listSize || end >= listSize) {
                    setErrorMessage(
                        start + 1 + "," + (end + 1) + inputTooBig + listSize
                    );
                    throw new Error();
                } else if (start < 0 || end < 0) {
                    setErrorMessage(
                        start + 1 + "," + (end + 1) + inputTooSmall
                    );
                    throw new Error();
                }

                for (let i: number = start; i <= end; i++) {
                    filesChosen.push(i);
                }
            } else {
                const number = parseInt(input) - 1;

                // check if input is valid
                if (number < 0) {
                    setErrorMessage(number + 1 + inputTooSmall);
                    throw new Error();
                } else if (number >= listSize) {
                    setErrorMessage(number + 1 + inputTooBig + listSize);
                    throw new Error();
                }

                filesChosen.push(number);
            }
        }
    };

    return (
        <div>
            <Label for="generator">Choose a Generator</Label>
            <Input
                id="generator"
                type="select"
                defaultValue={generatorChosen} 
                onChange={handleChangeGenerator}
            >
                {generators.map((generator) => (
                    <option id={generator.id}>{generator.name}</option>
                ))}
            </Input>

            <Label for="files">{listSize} files are available</Label>
            <Input
                id="files"
                type="text"
                placeholder={placeHolder}
                onChange={handleChangeFiles}
            ></Input>

            <br />
            <Button color="primary" onClick={handleClickDownload}>
                Download Animation
            </Button>
            <OptionError errorMessage={errorMessage} />
        </div>
    );
}

