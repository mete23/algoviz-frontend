import {
    Navigate,
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import AnimationView from "./AnimationView";
import { ProgramStep } from "./view_components/navbars/GeneralNavBar";
import DownloadAnimation from "./view_components/sidebars/animation/DownloadAnimation";
import LoadStoredAnimationView from "./LoadStoredAnimationView";
import StartingPageView from "./StartingPageView";
import HelpView from "./HelpView";

/**
 * represents the props of {@link RoutesView}
 */
interface Props {
    sessionId: number;
    setProgramStep: (step: ProgramStep) => void;
}

/**
 * @author Benedikt, David, Tobi, Tim, Metehan
 *
 * @param props Props of {@link RoutesView}
 * @returns the routes of the application
 */
function RoutesView(props: Props): JSX.Element {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/edit" />} />
                <Route
                    path="/edit"
                    element={
                        <StartingPageView
                            sessionId={props.sessionId}
                            setProgramStep={props.setProgramStep}
                        />
                    }
                />
                <Route
                    path="/shared-animation/:sharedAnimationId"
                    element={
                        <LoadStoredAnimationView sessionId={props.sessionId} />
                    }
                />
                <Route
                    path="/animation"
                    element={
                        <AnimationView
                            sessionId={props.sessionId}
                            setProgramStep={props.setProgramStep}
                        />
                    }
                />
                <Route
                    path="/animation/download"
                    element={<DownloadAnimation sessionId={props.sessionId} />}
                />
                <Route
                    path="/help"
                    element={
                        <HelpView />
                    }
                />
            </Routes>
        </Router>
    );
}

export default RoutesView;

