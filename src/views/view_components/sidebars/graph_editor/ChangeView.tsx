import { Dispatch, SetStateAction } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { ViewStyleEnum } from "../../../2DVisualization/ViewStyleEnum";

interface GraphData {
    viewStyle: ViewStyleEnum;
    setView: Dispatch<SetStateAction<ViewStyleEnum>>;
}

export const ChangeView = ({ viewStyle, setView }: GraphData): JSX.Element => {
    const toggleTrueFalse = (): void => {
        viewStyle =
            viewStyle == ViewStyleEnum.BIG
                ? ViewStyleEnum.COMPACT
                : ViewStyleEnum.BIG;
        setView(viewStyle);
    };

    return (
        <Form>
            <FormGroup switch>
                <Input
                    name='switch_viewstyle'
                    title={viewStyle == ViewStyleEnum.COMPACT ? "switch to big viewstyle": "switch to compact viewstyle"}
                    type="switch"
                    role="switch"
                    defaultChecked={viewStyle == ViewStyleEnum.COMPACT}
                    onClick={toggleTrueFalse}
                />
                <Label value> Compact View </Label>
            </FormGroup>
        </Form>
    );
};
