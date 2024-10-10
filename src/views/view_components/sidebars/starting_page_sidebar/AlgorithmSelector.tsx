import { ChangeEvent, useEffect, useState } from "react";
import { FormGroup, FormText, Input } from "reactstrap";
import AlgorithmSelectionController from "../../../../controller/algorithm/AlgorithmSelectionController";

interface Algorithm {
    id: string;
    name: string;
}

interface Props {
    handleChangeAlgorithm: (algorithmId: string) => void;
    algorithmSelected: string;
    algorithmDescription: string;
    setAlgorithmDescription: (description: string) => void;
}

export default function AlgorithmSelector(props: Props) {
    const algorithmSelectionController = new AlgorithmSelectionController();
    const [algorithms, setAlgorithms] = useState<Algorithm[]>([]);
    const [description, setDescription] = useState<string>("");

    useEffect(() => {
        async function fetchOptions() {
            const cache: Algorithm[] = [];
            const algorithmIDs =
                await algorithmSelectionController.getAlgorithms();

            for (let algorithm of algorithmIDs) {
                const name: string = await algorithmSelectionController.getName(
                    algorithm
                );
                cache.push({ id: algorithm, name: name });
            }

            setAlgorithms(cache);
            if (props.algorithmSelected === "") {
                props.handleChangeAlgorithm(cache[0].id);

                props.setAlgorithmDescription(
                    await algorithmSelectionController.getDescription(
                        cache[0].id
                    )
                );
            }
        }
        fetchOptions();
    }, []);

    const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const algorithmId = event.target.value;
        props.setAlgorithmDescription(
            await algorithmSelectionController.getDescription(algorithmId)
        );
        props.handleChangeAlgorithm(algorithmId);
    };

    return (
        <div>
            <FormGroup>
                <Input
                    name='algorithm_selector'
                    type="select"
                    onChange={handleChange}
                    value={props.algorithmSelected}
                    title={
                        "current selected algorithm is " +
                        props.algorithmSelected
                    }
                >
                    {algorithms.map((algorithm) => (
                        <option key={algorithm.id} value={algorithm.id}>
                            {" "}
                            {algorithm.name}{" "}
                        </option>
                    ))}
                </Input>
                <center>
                    <FormText name='algorithm_description'>{props.algorithmDescription}</FormText>
                </center>
            </FormGroup>
        </div>
    );
}

