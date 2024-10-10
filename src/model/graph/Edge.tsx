import Node from "./Node";

/**
 * represents an edge in a graph
 *
 * @author Tobias
 * @version 1.0
 */
class Edge {
    id: number;
    source: Node;
    target: Node;
    weight: number;
    colorHexadecimal: string;
    weighted: boolean;
    directed: boolean;

    /**
     * Constructor for an edge
     *
     * @param id the id of the edge as number
     * @param firstNode the first node of the edge as Node
     * @param secondNode the second node of the edge as Node
     * @param weight the weight of the edge as number
     * @param colorHexadecimal the color of the edge in hexadecimal code as string
     */
    constructor(
        id: number,
        firstNode: Node,
        secondNode: Node,
        weight: number,
        colorHexadecimal: string
    ) {
        this.id = id;
        this.source = firstNode;
        this.target = secondNode;
        this.weight = weight;
        this.colorHexadecimal = colorHexadecimal;
        this.weighted = true;
        this.directed = true;
    }

    getSource(): Node {
        return this.source;
    }

    getTarget(): Node {
        return this.target;
    }

    getweight(): number {
        return this.weight;
    }

    getColorHexadecimal(): string {
        return this.colorHexadecimal;
    }

    getId(): number {
        return this.id;
    }

    /**
     * generates an edge with a random id, a weight of 1 and a color of black
     *
     * @param firstNode the first node of the edge as Node
     * @param secondNode the second node of the edge as Node
     * @returns the generated edge as Edge
     */
    static generateEdge(firstNode: Node, secondNode: Node): Edge {
        return new Edge(Date.now(), firstNode, secondNode, 1, "#000000");
    }

    /**
     * generates an edge with a random id and a color of black
     *
     * @param firstNode the first node of the edge as Node
     * @param secondNode the second node of the edge as Node
     * @param weight the weight of the edge as number
     * @returns the generated edge as Edge
     */
    static generateEdgeWeighted(
        firstNode: Node,
        secondNode: Node,
        weight: number
    ): Edge {
        return new Edge(Date.now(), firstNode, secondNode, weight, "#000000");
    }
}

export default Edge;

