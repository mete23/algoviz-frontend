/**
 * This class represents a node in the graph
 *
 * @author: Metehan
 * @version: 1.0
 */
class Node {
    id: number;
    coordinates: number[];
    _label: string;
    private _startingNode: boolean;
    colorHexadecimal: string;

    /**
     * This constructor creates a node with the given parameters
     *
     * @param id the id of the node as a number
     * @param coordinates the coordinates of the node as a number array
     * @param label the label of the node as a string
     * @param startingNode the starting node of the graph as a boolean
     * @param colorHexadecimal the color of the node in hexadecimal as a string
     */
    constructor(
        id: number,
        coordinates: number[],
        label: string,
        startingNode: boolean,
        colorHexadecimal: string
    ) {
        this.id = id;
        this.coordinates = coordinates;
        this._label = label;
        this._startingNode = startingNode;
        this.colorHexadecimal = colorHexadecimal;
    }

    //getter for coordinates
    public get getCoordinates(): number[] {
        return this.coordinates;
    }

    /**
     * this method returns the name of the node
     *
     * @returns the name of the node
     */
    public get getId(): number {
        return this.id;
    }

    /**
     * this method returns the color of the node
     *
     * @returns the color of the node
     */
    public get getColor(): string {
        return this.colorHexadecimal;
    }

    public get label(): string {
        return this._label;
    }

    public set label(label: string) {
        this._label = label;
    }

    /**
     * generates a node with the given coordinates and the current time as id and color black
     *
     * @param coordinates the coordinates of the node as a number array
     * @returns the generated node
     */
    static generateNode(coordinates: number[]): Node {
        return new Node(Date.now(), coordinates, "", false, "#000000");
    }

    public get startingNode(): boolean {
        return this._startingNode;
    }

    public set startingNode(startingNode: boolean) {
        this._startingNode = startingNode;
    }
}
export default Node;

