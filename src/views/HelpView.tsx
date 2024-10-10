import { title } from "process";
import { useState } from "react";
import { Button } from "reactstrap";
import ChangeView from "./help_pages/changeView";
import ChooseTemplate from "./help_pages/choose_template";
import EditGraph from "./help_pages/edit_graph";
import GenerateGraph from "./help_pages/generate";
import GraphFileDot from "./help_pages/graph_file_dot";
import LogFile from "./help_pages/log_file";
import PlayAnimation from "./help_pages/play_animation";
import SelectAlgorithm from "./help_pages/selectAlgorithm";
import ShareAnimation from "./help_pages/share_animation";
import TikZExport from "./help_pages/tikz_export";
import Sidebar from "./view_components/sidebars/Sidebar";

type pair = {
    title: string;
    element: JSX.Element;
};
const helpPages: Array<pair> = [
    { title: "Edit Graph", element: <EditGraph /> },
    { title: "Change View", element: <ChangeView /> },
    { title: "Choose Template", element: <ChooseTemplate /> },
    { title: "Generate Graph", element: <GenerateGraph /> },
    { title: "Select Algorithm", element: <SelectAlgorithm /> },
    { title: "Visualize Algorithm", element: <PlayAnimation /> },
    { title: "Share Animation", element: <ShareAnimation /> },
    { title: "TikZ Export", element: <TikZExport /> },
    { title: "Log File", element: <LogFile /> },
    { title: "DOT Format", element: <GraphFileDot /> },
];

/**
 * This view represents the help view of the website.
 *
 * @returns help view
 *
 * @author Tim
 * @version 0.1
 */
export default function HelpView(): JSX.Element {
    const [selectedPage, setSelectedPage] = useState(helpPages[0]);

    return (
        <div className="GraphWrapper">
            <Sidebar
                elements={helpPages.map((page) => (
                    <div key={page.title}>
                        <Button
                            name={page.title}
                            color="primary"
                            outline
                            title={page.title}
                            onClick={() => setSelectedPage(page)}
                            active={page == selectedPage}
                        >
                            {page.title}
                        </Button>
                    </div>
                ))}
            />
            <div className="elementsWrapper">{selectedPage.element}</div>
        </div>
    );
}

