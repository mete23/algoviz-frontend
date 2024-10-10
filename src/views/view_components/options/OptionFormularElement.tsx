import { ChangeEvent, useState } from "react";
import { Col, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import { Formular, InputData } from "./OptionFormularView";

/**
 * Represents the props of {@link OptionFormularElement}
 */
export interface OptionFormularProp {
    formular: Formular;
    handleChange(data: InputData): void;
    setIsDataValid(isValid: boolean): void;
}

/**
 * Represents the props of {@link FormularInteger}
 */
export interface NumberOptionFormularProp {
    formular: Formular;
    integerValue: boolean;
    step: number;
    handleChange(data: InputData): void;
    setIsDataValid(isValid: boolean): void;
}

/**
 * Represents the differnt types of input parameters in the formular elements
 */
export enum ParameterType {
    INT = "INT",
    DOUBLE = "DOUBLE",
    BOOLEAN = "BOOLEAN"
}

/**
 * This react component renders a formular input element for differnt types of parameters.
 * The input elements contains slider and number input elemnts
 *
 * @param param
 *
 * @returns an option formular element
 *
 * @author David, Benedikt
 */
export default function OptionFormularElement({
    formular,
    handleChange,
    setIsDataValid
}: OptionFormularProp) {
    switch (formular.type) {
        case ParameterType.INT:
            return (
                <FormularInteger
                    formular={formular}
                    integerValue={true}
                    step={1}
                    handleChange={handleChange}
                    setIsDataValid={setIsDataValid}
                />
            );

        case ParameterType.DOUBLE:
            return (
                <FormularInteger
                    formular={formular}
                    integerValue={false}
                    step={0.01}
                    handleChange={handleChange}
                    setIsDataValid={setIsDataValid}
                />
            );

        case ParameterType.BOOLEAN:
            return (
                <FormularBoolean
                    formular={formular}
                    handleChange={handleChange}
                    setIsDataValid={setIsDataValid}
                />
            );

        default:
            return <></>;
    }
}

/**
 * Represents a formular element for number paramters
 *
 * @param param0
 *
 * @returns
 */
const FormularInteger = ({
    formular,
    integerValue,
    step,
    handleChange,
    setIsDataValid
}: NumberOptionFormularProp) => {
    /**
     * The value of the slider input elementinput values
     */
    const [value, setValue] = useState(formular.minimum);

    /**
     * The value of the text input element
     */
    const [textInput, setTextInput] = useState(String(formular.minimum));

    /**
     * Represents if the input is valid in both input elements(slider and text input)
     */
    const [isInputValid, setIsInputValid] = useState(true);

    /**
     * Checks if the input is valid and handles invalid input
     *
     * @param input input value
     *
     * @returns if the value is valid
     */
    const handleInvalidInput = (input: string): boolean => {
        if (
            isNaN(+input) ||
            +input < formular.minimum ||
            +input > formular.maximum ||
            (integerValue && +input % 1 !== 0)
        ) {
            setIsInputValid(false);
            setIsDataValid(false);
            return true;
        }
        return false;
    };

    /**
     * Handels the input of the slider and text input elements.
     * The input is updated in {@link value} and {@link textInput}
     *
     * @param e change event of the input element
     */
    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTextInput(e.target.value);
        setIsInputValid(true);
        setIsDataValid(true);
        setValue(+e.target.value);
    };

    return (
        <FormGroup>
            <Label for="exampleRange">{formular.description}</Label>
            <Row xs="4">
                <Col xs="1">{formular.minimum}</Col>
                <Col xs="6">
                    <Input
                        type="range"
                        name={formular.name + "_range"}
                        id={formular.type}
                        min={formular.minimum}
                        max={formular.maximum}
                        step={step}
                        value={value}
                        onChange={(e) => {
                            if (handleInvalidInput(e.target.value)) {
                                setTextInput(e.target.value);
                                return;
                            }
                            handleInput(e);
                            handleChange({
                                name: formular.name,
                                value: String(+e.target.value),
                                type: e.target.id
                            });
                        }}
                    />
                </Col>
                <Col xs="2">{formular.maximum}</Col>
                <Col xs="3">
                    <Input
                        type="text"
                        name={formular.name + "_text"}
                        key={formular.name}
                        id={formular.type}
                        min={formular.minimum}
                        max={formular.maximum}
                        value={textInput}
                        invalid={!isInputValid}
                        onChange={(e) => {
                            if (handleInvalidInput(e.target.value)) {
                                setTextInput(e.target.value);
                                return;
                            }
                            handleInput(e);
                            handleChange({
                                name: formular.name,
                                value: String(+e.target.value),
                                type: e.target.id
                            });
                        }}
                    />
                </Col>
            </Row>
            <FormFeedback>Input is invalid!</FormFeedback>
        </FormGroup>
    );
};

/**
 * Represents a formular element for boolean paramters.
 * The input element contains a slider with the values true and false
 *
 * @param param
 *
 * @returns
 */
const FormularBoolean = ({
    formular,
    handleChange,
    setIsDataValid
}: OptionFormularProp) => {
    /**
     * The value of the slider input element
     */
    const [value, setValue] = useState(0);

    return (
        <div>
            <FormGroup>
                <Label check>{formular.description}</Label>
                <Row xs="3">
                    <Col xs="2">false</Col>
                    <Col xs="6">
                        <Input
                            type="range"
                            name={formular.name + "_range"}
                            id="BOOLEAN"
                            min={0}
                            max={1}
                            value={value}
                            onChange={(e) => {
                                setValue(+e.target.value);

                                let booleanValue: string = "false";
                                if (e.target.value === "1") {
                                    booleanValue = "true";
                                }

                                handleChange({
                                    name: formular.name,
                                    value: booleanValue,
                                    type: e.target.id
                                });
                            }}
                        />
                    </Col>
                    <Col xs="1">true</Col>
                </Row>
            </FormGroup>
        </div>
    );
};
