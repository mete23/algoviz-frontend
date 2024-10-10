import { ChangeEvent, useState } from "react";
import { Col, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import { Formular, InputData } from "./OptionFormularView";

/**
 * represents the props of {@link OptionFormular}
 */
export interface OptionFormularProp {
    formular: Formular;
    handleChange(data: InputData): void;
    setIsDataValid(isValid: boolean): void;
}

/**
 * reprensents the props of {@link FormularElementNumber}
 */
export interface NumberOptionFormularProp {
    formular: Formular;
    integerValue: boolean;
    step: number;
    handleChange(data: InputData): void;
    setIsDataValid(isValid: boolean): void;
}

/**
 * reprents the different input types of an option formular element
 */
export enum ParameterType {
    INT = "INT",
    DOUBLE = "DOUBLE",
    BOOLEAN = "BOOLEAN",
}

/**
 *
 *
 * @author Benedikt, David
 */
export default function OptionFormular({
    formular,
    handleChange,
    setIsDataValid,
}: OptionFormularProp) {
    switch (formular.type) {
        case ParameterType.INT:
            return (
                <FormularElementNumber
                    formular={formular}
                    integerValue={true}
                    step={1}
                    handleChange={handleChange}
                    setIsDataValid={setIsDataValid}
                />
            );

        case ParameterType.DOUBLE:
            return (
                <FormularElementNumber
                    formular={formular}
                    integerValue={false}
                    step={0.01}
                    handleChange={handleChange}
                    setIsDataValid={setIsDataValid}
                />
            );

        case ParameterType.BOOLEAN:
            return (
                <FormularElementBoolean
                    formular={formular}
                    handleChange={handleChange}
                    setIsDataValid={setIsDataValid}
                />
            );

        default:
            return <></>;
    }
}

const FormularElementNumber = ({
    formular,
    integerValue,
    step,
    handleChange,
    setIsDataValid,
}: NumberOptionFormularProp) => {
    const [value, setValue] = useState(formular.minimum);
    const [textInput, setTextInput] = useState(String(formular.minimum));
    const [isInputValid, setIsInputValid] = useState(true);

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

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (handleInvalidInput(e.target.value)) {
            setTextInput(e.target.value);
            return;
        }
        setTextInput(e.target.value);
        setIsInputValid(true);
        setIsDataValid(true);
        setValue(+e.target.value);
        handleChange({
            name: e.target.name,
            value: String(+e.target.value),
            type: e.target.id,
        });
    };

    return (
        <FormGroup>
            <Label for="exampleRange">{formular.description}</Label>
            <Row xs="4">
                <Col xs="1">{formular.minimum}</Col>
                <Col xs="7">
                    <Input
                        type="range"
                        name={formular.name}
                        id={formular.type}
                        min={formular.minimum}
                        max={formular.maximum}
                        step={step}
                        value={value}
                        onChange={(e) => {
                            handleInput(e);
                        }}
                    />
                </Col>
                <Col xs="1">{formular.maximum}</Col>
                <Col xs="3">
                    <Input
                        type="text"
                        name={formular.name}
                        id={formular.type}
                        min={formular.minimum}
                        max={formular.maximum}
                        value={textInput}
                        invalid={!isInputValid}
                        onChange={(e) => {
                            handleInput(e);
                        }}
                    />
                </Col>
            </Row>
            <FormFeedback>Input is invalid!</FormFeedback>
        </FormGroup>
    );
};

const FormularElementBoolean = ({
    formular,
    handleChange,
    setIsDataValid,
}: OptionFormularProp) => {
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
                            name={formular.name}
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
                                    name: e.target.name,
                                    value: booleanValue,
                                    type: e.target.id,
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

