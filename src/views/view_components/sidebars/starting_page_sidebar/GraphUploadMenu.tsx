import { useRef, useState } from "react";
import { Input } from "reactstrap";
import GraphController from "../../../../controller/graph/GraphController";
import { UploadGraphController } from "../../../../controller/graph/UploadGraphControler";
import Graph from "../../../../model/graph/Graph";
import OptionError from "../../options/OptionError";

/**
 * object of the sessionData as props
 */
interface Props {
    sessionId: number;
    setGraph: (graph: Graph) => void;
}

/**
 * This react component renders a menu to upload a graphfile.
 *
 * @param param props of the component
 *
 * @returns menu to upload a graphfile
 */
export default function GraphUploadMenu({ sessionId, setGraph }: Props) {
    const fileInput = useRef<HTMLInputElement>(null);
    const uploadGraphController: UploadGraphController =
        new UploadGraphController();
    const graphController: GraphController = new GraphController();

    /**
     * stored the error message
     */
    const [errorMessage, setErrorMessage] = useState<string>("");

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
    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file: File | undefined = event.target.files?.[0];
        if (!file) {
            setErrorMessage("Upload failed!");
            return;
        }
        const fileReader = new FileReader();
        fileReader.readAsText(file, "UTF-8");
        fileReader.onload = async (e: ProgressEvent<FileReader>) => {
            try {
                const content: string | ArrayBuffer | null = fileReader.result;
                if (!content) {
                    throw new Error("File could not be read!");
                }
                await uploadGraphController.uploadGraphData(
                    sessionId,
                    content?.toString()
                );
                const graph: Graph | undefined = await graphController.getGraph(
                    sessionId
                );
                if (graph !== undefined) {
                    setGraph(graph);
                }
            } catch (error: any) {
                setErrorMessage(error.message);
            }
        };
    };

    return (
        <div className="elementsWrapper">
            <Input
                name='graph_upload_field'
                type="file"
                title='upload your log file in the dot format here'
                onClick={() => {
                    handleClick();
                }}
                onChange={(e) => {
                    handleChange(e);
                }}
            />
            <OptionError errorMessage={errorMessage} />
        </div>
    );
}

