import { useEffect, useState } from "react";
import Graph from "../model/graph/Graph";
import { ViewStyleEnum } from "./2DVisualization/ViewStyleEnum";
import AnimationSidebar from "./view_components/sidebars/animation/AnimationSidebar";
import GraphController from "../controller/graph/GraphController";
import AlgorithmExecutionHandler from "../handler/AlgorithmExecutionHandler";
import GraphVisualizationTwoD, {
    GraphEditMode,
} from "./2DVisualization/GraphVisualizationTwoD";
import { ProgramStep } from "./view_components/navbars/GeneralNavBar";
import AlgorithmExecutionController from "../controller/algorithm/AlgorithmExecutionController";
import { StorageObject } from "./StartingPageView";

/**
 * Represents the props of the GraphAnimationView component.
 */
interface GraphAnimationViewProps {
    sessionId: number;
    setProgramStep: (step: ProgramStep) => void;
}

/**
 * This react component represents the animation view of the application.
 *
 * @param props
 *
 * @returns
 */
export default function AnimationView(
    props: GraphAnimationViewProps
): JSX.Element {
    const [graph, setGraph] = useState(new Graph([], [], false, false));
    const [viewStyle, setViewStyle] = useState(ViewStyleEnum.BIG);
    const [speed, setSpeed] = useState(0);
    const [updateGraph, setUpdateGraph] = useState(0);
    const sessionId: number = props.sessionId;
    const [sharedAnimationLink, setSharedAnimationLink] = useState<string>("");
    const [hasNext, setHasNext] = useState<boolean>(true);
    const [executed, setExecuted] = useState<boolean>(false);
    const [animationFinished, setAnimationFinished] = useState<boolean>(false);
    const [algorithmExecutionHandler, setAlgorithmExecutionHandler] = useState(
        new AlgorithmExecutionHandler(sessionId, graph)
    );

    const controller = new AlgorithmExecutionController();

    var nextAvailable = true;

    const executeStep = async (): Promise<void> => {
        if (hasNext) {
            const hasNextStep: boolean =
                await algorithmExecutionHandler.executeStep();
            setHasNext(hasNextStep);
            nextAvailable = hasNextStep;
            setUpdateGraph((updateGraph) => updateGraph + 1);
        }
    };

    const onFinish = (): void => {
        setSpeed(0);
        setAnimationFinished(true);
    };

    const skipClicked = async (): Promise<void> => {
        let isExecuted = await controller.isExecuted(sessionId);
        if (isExecuted && !hasNext) {
            resetAnimation();
            return;
        }
        executeStep();
    };

    const backClicked = async (): Promise<void> => {
        await algorithmExecutionHandler.stepBack();
        setUpdateGraph((updateGraph) => updateGraph + 1);
    };

    const resetAnimation = async (): Promise<void> => {
        // reset speed to 0
        setSpeed(0);

        // reset graph
        const graph: Graph = await algorithmExecutionHandler.resetAnimation();
        setGraph(graph);

        // reset variables
        nextAvailable = true;
        setHasNext(true);
        setUpdateGraph(0);
    };

    /**
     * Fetches the graph from the backend and
     */
    useEffect(() => {
        props.setProgramStep(ProgramStep.VIEW_ALGORITHM);
        const fetchGraph = async (): Promise<void> => {
            const graphController: GraphController = new GraphController();
            const graph: Graph = await graphController.getGraph(sessionId);
            setGraph(graph);
            setAlgorithmExecutionHandler(
                new AlgorithmExecutionHandler(sessionId, graph)
            );
            await algorithmExecutionHandler.startExecuting();
        };
        fetchGraph();
    }, []);

    useEffect(() => {
        const currentSpeed: number = 1000 / speed;
        if (currentSpeed >= Infinity) {
            return;
        }

        if (animationFinished) {
            resetAnimation();
        }

        const preCheckNext = async () => {
            nextAvailable = await controller.hasNext(sessionId);
            setHasNext(nextAvailable);
        };
        preCheckNext();
        const intervalId: NodeJS.Timeout = setInterval(async () => {
            let isExecuted = await controller.isExecuted(sessionId);
            setExecuted(isExecuted);

            if (isExecuted && !nextAvailable) {
                clearInterval(intervalId);
                onFinish();
                return;
            }

            executeStep();
        }, currentSpeed);

        // will be executed before the in interval is entered
        setAnimationFinished(false);
        return () => clearInterval(intervalId);
    }, [speed]);

    return (
        <div className="GraphWrapper">
            <AnimationSidebar
                viewStyle={viewStyle}
                sessionId={props.sessionId}
                setViewStyle={setViewStyle}
                speed={speed}
                sharedAnimationLink={sharedAnimationLink}
                setSharedAnimationLink={setSharedAnimationLink}
                setSpeed={setSpeed}
                skipClicked={skipClicked}
                stopClicked={resetAnimation}
                backClicked={backClicked}
                hasNext={hasNext}
                executed={executed}
                resetAnimation={resetAnimation}
            />
            <div className="elementsWrapper">
                <GraphVisualizationTwoD
                    graph={graph}
                    viewStyle={viewStyle}
                    updateGraph={updateGraph}
                    markedNodesArray={[]}
                    setMarkedNodes={() => {}}
                    setMarkedEdge={() => {}}
                    graphEditMode={GraphEditMode.SELECT}
                    storageObject={new StorageObject()}

                    //selectMode={false}
                />
            </div>
        </div>
    );
}

