/**
 * Represents an edge in the API call.
 *
 * @author Tobias
 * @version 1.0
 */
interface NodeExternal {
    id: number;
    coordinates: number[];
    label: string;
    startingNode: boolean;
    colorHexadecimal: string;
}

export default NodeExternal;
