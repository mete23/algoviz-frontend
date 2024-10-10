/**
 * Represents an edge in the API call.
 *
 * @author Tobias
 * @version 1.0
 */
interface EdgeExternal {
    id: number;
    sourceId: number;
    targetId: number;
    weight: number;
    colorHexadecimal: string;
}

export default EdgeExternal;
