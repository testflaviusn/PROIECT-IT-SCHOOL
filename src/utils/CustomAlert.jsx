import { useEffect } from "react";
import Alert from "react-bootstrap/Alert";

function CustomAlert({ message, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="alert-box">
            <Alert variant="success" className="mb-0 text-center">
                <Alert.Heading>{message}</Alert.Heading>
                <p>This message will self destruct in 2 seconds!</p>
            </Alert>
        </div>
    );
}

export default CustomAlert;
