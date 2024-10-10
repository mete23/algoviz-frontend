import { useNavigate } from "react-router-dom";
import { Button, Navbar, NavbarBrand, NavbarProps } from "reactstrap";
import AlgovizLogo from "../../../logo/AlgovizLogo";

export enum ProgramStep {
    HOME,
    SELECT_ALGORITHM,
    SELECT_GRAPH,
    EDIT_GRAPH,
    VIEW_ALGORITHM,
}

export interface GeneralNavBarProps {
    sessionId?: number;
}

export default function GeneralNavBar(props: GeneralNavBarProps) {

    /**
     * props for the navbar
     */
    const args: NavbarProps = {
        color: "dark",
        dark: true,
        expand: "md",
    };

    return (
        <div>
            <Navbar {...args}>
                <NavbarBrand name='home_logo' href="/">
                <div title='go to starting page'>
                    <AlgovizLogo/> AlgoViz
                </div>
                </NavbarBrand>
                <Button
                    className="float-right"
                    name='help_button'
                    style={{ width: "70px" }}
                    color="primary"
                    href="/help"
                    target="blank"
                >
                    Help
                </Button>
            </Navbar>
        </div>
    );
}