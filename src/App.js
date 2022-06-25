import AppRoutes from "./routes";

/**
* React Toastify
* @link https://fkhadra.github.io/react-toastify/introduction
*/
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default function App() {
    return (
        <>
            <ToastContainer />
            <AppRoutes />
        </>
    );
}
