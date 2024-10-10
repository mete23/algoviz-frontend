import { useState, useEffect } from "react";
import RoutesView from "./views/Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import SessionController from "./controller/SessionController";
import GeneralNavBar, {
    ProgramStep,
} from "./views/view_components/navbars/GeneralNavBar";

function App() {
    const [sessionId, setSessionId] = useState<number>(0);
    const sessionController = new SessionController();

    useEffect(() => {
        async function fetchOptionsStart(): Promise<void> {
            const sessionId = await sessionController.startSession();
            setSessionId(sessionId);
        }
        fetchOptionsStart();

        window.addEventListener("beforeunload", () => {
            async function fetchOptionsDelete(sessionId: number) {
                await sessionController.endSession(sessionId);
            }

            if (sessionId) {
                fetchOptionsDelete(sessionId);
                setSessionId(0);
            }
        });

        return () => {
            window.removeEventListener("beforeunload", () => {});
        };
    }, []);

    const [programStep, setProgramStep] = useState<ProgramStep>(
        ProgramStep.SELECT_GRAPH
    );

    return (
        <div className="App">
            <GeneralNavBar sessionId={sessionId}/>
            <RoutesView sessionId={sessionId} setProgramStep={setProgramStep} />
        </div>
    );
}
export default App;
