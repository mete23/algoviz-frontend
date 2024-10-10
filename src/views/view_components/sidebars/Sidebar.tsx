import { ReactNode } from "react";
import { List, NavbarBrand } from "reactstrap";
import AlgovizLogo from "../../../logo/AlgovizLogo";

/**
 * represents the props of {@link Sidebar}
 */
export interface SideBarProps {
    elements?: ReactNode[];
}

/**
 * This react component renders a modular sidebar with a list of elements
 *
 * @param props sidebar elements
 *
 * @returns sidebar
 *
 * @author Metehan
 */
export default function Sidebar(props: SideBarProps | undefined) {
    return (
        <div className="sidebar">
            <div className="sidebartop"></div>
            <List type="unstyled">
                {props?.elements?.map((element) => (
                    <div key={Math.random()}>
                        <li>
                            <hr></hr>
                        </li>
                        <li>{element}</li>
                    </div>
                ))}
            </List>
        </div>
    );
}

