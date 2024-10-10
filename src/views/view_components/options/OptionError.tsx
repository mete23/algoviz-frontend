/**
 * @author Benedikt
 * @version 1.0
 *
 * Shows error message if there is one
 * @param param Error message to be displayed as string
 * @returns a JSX.Element with the error message
 */
const VisError = ({ errorMessage }: { errorMessage: string }) => {
    if (
        errorMessage === undefined ||
        errorMessage === null ||
        errorMessage === ""
    ) {
        return <></>;
    }
    const head = "Error:";
    const color = "red";

    return (
        <div style={{ textAlign: "center" }}>
            <p style={{ color: color }}>{errorMessage}</p>
        </div>
    );
};

export default VisError;

