import Edge from "./Edge";
import Node from "./Node";

/**
 * this class represents a graph
 *
 * @author Metehan
 * @version 1.0
 */
class Graph {
    private nodes: Node[];
    private edges: Edge[];
    private weighted: boolean;
    private directed: boolean;

    /**
     * this constructor creates a graph with the given nodes, edges, weighted and directed
     *
     * @param nodes the nodes of the graph
     * @param edges the edges of the graph
     * @param weighted if the edges of the graph are weighted or not
     * @param directed if the edges of the graph are directed or not
     */
    constructor(
        nodes: Node[],
        edges: Edge[],
        weighted: boolean,
        directed: boolean
    ) {
        this.nodes = nodes;
        this.edges = edges;
        this.weighted = weighted;
        this.directed = directed;
    }

    /**
     * this method adds the given node to the graph
     *
     * @param node the node to be added to the graph
     */
    public addNode(node: Node) {
        this.nodes.push(node);
    }

    /**
     * this method returns the starting nodes of the graph as an array
     *
     * @returns the starting nodes of the graph as an array
     */
    getStartingNodes(): Node[] {
        return this.nodes.filter((n: Node) => n.startingNode);
    }


    /**
     * this method adds the given edge to the graph
     *
     * @param edge the edge to be added to the graph
     */
    addEdge(edge: Edge) {
        this.edges.push(edge);
    }

    /**
     * this method adds the connects two nodes with a edge
     *
     * @param id1 first node of the edge
     * @param id2 second node of the edge
     */
    addEdgeById(id1: number, id2: number) {
        const node1: Node | undefined = this.nodes.find(
            (n: Node) => n.id == id1
        );
        const node2: Node | undefined = this.nodes.find(
            (n: Node) => n.id == id2
        );

        if (node1 !== undefined && node2 instanceof Node) {
            this.edges.push(new Edge(Date.now(), node1, node2, 1, "#000000"));
        }
    }

    /**
     * this method removes the given node from the graph
     *
     * @param node the node to be removed
     */
    removeNode(node: Node) {
        this.nodes = this.nodes.filter((n: Node) => n !== node);
    }

    /**
     * this method removes the node with the given id
     *
     * @param id the id of the node to be removed
     */
    removeNodeById(id: number) {
        this.nodes = this.nodes.filter((n: Node) => n.id !== id);
        this.edges = this.edges.filter(
            (e: Edge) => e.source.id !== id && e.target.id !== id
        );
    }

    /**
     * this method removes the given edge from the graph
     *
     * @param edge the edge to be removed
     */
    removeEdge(edge: Edge) {
        this.edges = this.edges.filter((e: Edge) => e !== edge);
    }

    /**
     * this method removes the edge with the given id
     *
     * @param id the id of the edge to be removed
     */
    removeEdgeById(id: number) {
        this.edges = this.edges.filter((e: Edge) => e.id !== id);
    }

    /**
     * this method removes the edge between two nodes, given by ids.
     *
     * @param firstNodeId id of the first node
     * @param secondNodeId id of the second node
     */
    removeEdgeByNodeIds(firstNodeId: number, secondNodeId: number) {
        this.edges = this.edges.filter(
            (e: Edge) =>
                !(e.source.id == firstNodeId && e.target.id == secondNodeId) ||
                (e.source.id == secondNodeId && e.target.id == firstNodeId)
        );
    }

    /**
     * this method returns the nodes of the graph as an array
     *
     * @returns the nodes of the graph as an array
     */
    getNodes(): Node[] {
        return this.nodes;
    }

    /**
     * this method returns the edges of the graph as an array
     *
     * @returns the edges of the graph
     */
    getEdges(): Edge[] {
        return this.edges;
    }

    /**
     * this method returns the node with the given id
     *
     * @param id the id of the node
     * @returns the node with the given id, undefined if the node does not exist
     */
    getNodeById(id: number): Node | undefined {
        return this.nodes.find((node: Node) => node.id === id);
    }

    /**
     * this method returns the edge with the given id
     *
     * @param id the id of the edge
     * @returns the edge with the given id, undefined if the edge does not exist
     */
    getEdgeById(id: number): Edge | undefined {
        return this.edges.find((edge: Edge) => edge.id === id);
    }

    /**
     * this method returns true if the graph is weighted, false otherwise
     *
     * @returns true if the graph is weighted, false otherwise
     */
    isWeighted(): boolean {
        return this.weighted;
    }

    /**
     * sets if the graph is weighted
     * @param weighted true if the graph is weighted
     */
    setWeighted(weighted: boolean): void {
        this.weighted = weighted;
    }

    /**
     * this method returns true if the graph is directed, false otherwise
     *
     * @returns true if the graph is directed, false otherwise
     */
    isDirected(): boolean {
        return this.directed;
    }

    /**
     * sets if the graph is directed
     * @param weighted true if the graph is directed
     */
    setDirected(directed: boolean): void {
        this.directed = directed;
    }
}

export default Graph;
