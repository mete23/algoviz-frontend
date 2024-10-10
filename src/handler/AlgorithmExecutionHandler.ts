import AlgorithmExecutionController from "../controller/algorithm/AlgorithmExecutionController";
import Edge from "../model/graph/Edge";
import Graph from "../model/graph/Graph";
import Node from "../model/graph/Node";
import EdgeExternal from "../model/graph/EdgeExternal";

type ModificationStep = {
    nodeChanges: [ChangeNode];
    edgeChanges: [ChangeEdge];
    graphChanges: [ChangeGraph];
};

type ChangeNodeAttribute = {
    newLabel?: string;
    oldLabel?: string;
    newCoordinates?: [number];
    oldCoordinates?: [number];
    newColor?: string;
    oldColor?: string;
};

type ChangeEdgeAttribute = {
    newColor?: string;
    oldColor?: string;
};

type ChangeNode = {
    nodeId: number;
    changes: ChangeNodeAttribute[];
};

type ChangeEdge = {
    edgeId: number;
    changes: ChangeEdgeAttribute[];
};

type ChangeGraph = {
    node?: Node;
    edge?: EdgeExternal;
    removedEdge?: [EdgeExternal];
    delete: boolean;
};

/**
 * responsible for executing the algorithm and changing the graph.
 *
 * @author Metehan, Tobias
 * @version 1.0
 */
export default class AlgorithmExecutionHandler {
    private graph: Graph;
    private sessionId: number;
    private algorithmExectionController: AlgorithmExecutionController =
        new AlgorithmExecutionController();

    /**
     * Constructor of the AlgorithmExecutionHandler
     *
     * @param sessionId the id of the session as number
     * @param graph the graph as Graph
     */
    constructor(sessionId: number, graph: Graph) {
        this.sessionId = sessionId;
        this.graph = graph;
    }

    /**
     * async function to start the execution of the algorithm
     */
    startExecuting = async (): Promise<void> => {
        this.algorithmExectionController.startExecution(this.sessionId);
    };

    /**
     * async function to reset the animation
     *
     * @returns the unmodified graph as Graph
     */
    async resetAnimation(): Promise<Graph> {
        const graph = await this.algorithmExectionController.resetAnimation(
            this.sessionId
        );
        this.graph = graph;
        return graph;
    }

    /**
     * async function to execute the next step of the algorithm
     * returns if the algorithm is executed and there is not a new step.
     *
     * @returns true if the algorithm has a next step, false if not
     */
    public executeStep = async (): Promise<boolean> => {
        const step: ModificationStep =
            await this.algorithmExectionController.getNextStep(this.sessionId);

        step.graphChanges.forEach((change) => {
            this.changeGraph(change);
        });

        step.nodeChanges.forEach((change) => {
            this.changeNode(change);
        });

        step.edgeChanges.forEach((change) => {
            this.changeEdge(change);
        });

        return await this.algorithmExectionController.hasNext(this.sessionId);
    };

    /**
     * async function to execute the previous step of the algorithm
     */
    public stepBack = async (): Promise<void> => {
        const step: ModificationStep =
            await this.algorithmExectionController.getLastStep(this.sessionId);

        step.nodeChanges.reverse();
        step.nodeChanges.forEach((change) => {
            this.undoChangeNode(change);
        });

        step.edgeChanges.reverse();
        step.edgeChanges.forEach((change) => {
            this.undoChangeEdge(change);
        });

        step.graphChanges.reverse();
        step.graphChanges.forEach((change) => {
            this.undoChangeGraph(change);
        });
    };

    private changeNode = (change: ChangeNode): void => {
        const nodeId: number = change.nodeId;
        const changes: ChangeNodeAttribute[] = change.changes;

        const node: Node | undefined = this.graph.getNodeById(nodeId);
        if (node == undefined) {
            return;
        }
        changes.forEach((changedAttribute: ChangeNodeAttribute) => {
            const newLabel: string | undefined = changedAttribute.newLabel;
            const newCoordinates: [number] | undefined =
                changedAttribute.newCoordinates;
            const newColor: string | undefined = changedAttribute.newColor;

            if (newLabel != undefined) {
                node.label = newLabel;
            }
            if (newColor != undefined) {
                node.colorHexadecimal = newColor;
            }
            if (newCoordinates != undefined) {
                node.coordinates = newCoordinates;
            }
        });
    };

    private changeEdge = (change: ChangeEdge): void => {
        const edgeId: number = change.edgeId;
        const changes: ChangeEdgeAttribute[] = change.changes;

        const edge: Edge | undefined = this.graph.getEdgeById(edgeId);
        if (edge == undefined) {
            return;
        }
        changes.forEach((changedAttribute: ChangeEdgeAttribute) => {
            const newColor: string | undefined = changedAttribute.newColor;
            if (newColor != undefined) {
                edge.colorHexadecimal = newColor;
            }
        });
    };

    private changeGraph = (change: ChangeGraph): void => {
        const node: Node | undefined = change.node;
        const edgeExternal: EdgeExternal | undefined = change.edge;
        if (node != undefined) {
            if (change.delete) {
                this.graph.removeNodeById(node.id);
            } else {
                this.graph.addNode(node);
            }
        } else if (edgeExternal != undefined) {
            const nodeTarget: Node | undefined = this.graph.getNodeById(
                edgeExternal.targetId
            );
            const nodeSource: Node | undefined = this.graph.getNodeById(
                edgeExternal.sourceId
            );
            if (nodeTarget == undefined || nodeSource == undefined) {
                return;
            }
            const edge: Edge = new Edge(
                edgeExternal.id,
                nodeSource,
                nodeTarget,
                edgeExternal.weight,
                edgeExternal.colorHexadecimal
            );
            if (change.delete) {
                this.graph.removeEdgeById(edge.id);
            } else {
                this.graph.addEdge(edge);
            }
        }
    };

    private undoChangeNode = (change: ChangeNode): void => {
        const nodeId: number = change.nodeId;
        const changes: ChangeNodeAttribute[] = change.changes;
        changes.reverse();

        const node: Node | undefined = this.graph.getNodeById(nodeId);
        if (node == undefined) {
            return;
        }
        changes.forEach((changedAttribute: ChangeNodeAttribute) => {
            const oldLabel: string | undefined = changedAttribute.oldLabel;
            const oldCoordinates: [number] | undefined =
                changedAttribute.oldCoordinates;
            const oldColor: string | undefined = changedAttribute.oldColor;

            if (oldLabel != undefined) {
                node.label = oldLabel;
            }
            if (oldColor != undefined) {
                node.colorHexadecimal = oldColor;
            }
            if (oldCoordinates != undefined) {
                node.coordinates = oldCoordinates;
            }
        });
    };

    private undoChangeEdge = (change: ChangeEdge): void => {
        const edgeId: number = change.edgeId;
        const changes: ChangeEdgeAttribute[] = change.changes;
        changes.reverse();

        const edge: Edge | undefined = this.graph.getEdgeById(edgeId);
        if (edge == undefined) {
            return;
        }
        changes.forEach((changedAttribute: ChangeEdgeAttribute) => {
            const oldColor: string | undefined = changedAttribute.oldColor;
            if (oldColor != undefined) {
                edge.colorHexadecimal = oldColor;
            }
        });
    };

    private undoChangeGraph = (change: ChangeGraph): void => {
        const node: Node | undefined = change.node;
        const edgeExternal: EdgeExternal | undefined = change.edge;
        if (node != undefined) {
            if (change.delete) {
                // node was deleted, so add it again
                this.graph.addNode(node);
                if (change.removedEdge == undefined) {
                    return;
                }
                for (const edgeExternal of change.removedEdge) {
                    const firstNode: Node = this.graph.getNodeById(
                        edgeExternal.sourceId
                    )!;
                    const secondNode: Node = this.graph.getNodeById(
                        edgeExternal.targetId
                    )!;
                    const edge = new Edge(
                        edgeExternal.id,
                        firstNode,
                        secondNode,
                        edgeExternal.weight,
                        edgeExternal.colorHexadecimal
                    );
                    this.graph.addEdge(edge);
                }
            } else {
                // node was added, so remove it again
                this.graph.removeNodeById(node.id);
            }
        } else if (edgeExternal != undefined) {
            const nodeTarget: Node | undefined = this.graph.getNodeById(
                edgeExternal.targetId
            );
            const nodeSource: Node | undefined = this.graph.getNodeById(
                edgeExternal.sourceId
            );
            if (nodeTarget == undefined || nodeSource == undefined) {
                return;
            }
            const edge: Edge = new Edge(
                edgeExternal.id,
                nodeSource,
                nodeTarget,
                edgeExternal.weight,
                edgeExternal.colorHexadecimal
            );
            if (change.delete) {
                // edge was deleted, so add it again
                this.graph.addEdge(edge);
            } else {
                // edge was added, so remove it again
                this.graph.removeEdgeById(edge.id);
            }
        }
    };
}

