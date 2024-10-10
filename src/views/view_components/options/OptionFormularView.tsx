import { useEffect, useState } from "react";
import { Button, Col, Form } from "reactstrap";
import { Event } from "three";
import OptionFormularElement, { ParameterType } from "./OptionFormularElement";

/**
 * represents the props of {@link OptionFormularView}
 */
export interface FormularViewProp {
    options: Formular[];
    handleInput(input: Map<string, { value: string; type: string }>): void;
}

/**
 * represents an option formular element
 */
export interface Formular {
    description: string;
    type: ParameterType;
    name: string;
    minimum: number;
    maximum: number;
}

/**
 * represents the inputdata of an input element
 */
export interface InputData {
    value: string;
    type: string;
    name: string;
}

/**
 * represents an element from the initial data.
 */
export interface InitData {
    key: string;
    value: { value: string; type: string };
}

/**
 *
 *
 * @author Benedikt, David
 */
export default function OptionFromularView(props: FormularViewProp) {
    const [input, setInput] = useState(
        new Map<string, { value: string; type: string }>()
    );
    const [isDataValid, setIsDataValid] = useState(true);

    useEffect(() => {
        const defaultValueBoolean: string = "false";
        const defaultInput = new Map<string, { value: string; type: string }>();
        props.options.forEach((formular) => {
            if (formular.type === ParameterType.BOOLEAN) {
                defaultInput.set(formular.name, {
                    value: defaultValueBoolean,
                    type: formular.type
                });
            } else {
                defaultInput.set(formular.name, {
                    value: String(formular.minimum),
                    type: formular.type
                });
            }
        });
        setInput(defaultInput);
    }, [props.options]);

    const handleChange = (data: InputData) => {
        setInput((input) =>
            input.set(data.name, {
                value: data.value,
                type: data.type
            })
        );
    };

    const handleSubmit = (event: Event) => {
        event.preventDefault();
        props.handleInput(input);
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                {props.options.map((formular) => (
                    <Col key={formular.name} xs={10} md={10} className="mb-3">
                        <OptionFormularElement
                            formular={formular}
                            handleChange={handleChange}
                            setIsDataValid={setIsDataValid}
                        />
                    </Col>
                ))}
                <Button
                    name='generate_graph_submit_button'
                    style={{ width: "85%" }}
                    disabled={!isDataValid}
                    color="primary"
                    type="submit"
                >
                    Generate Graph
                </Button>
            </Form>
        </div>
    );
}
