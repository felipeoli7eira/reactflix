import { Link } from "react-router-dom";

import ImgPageNotFound from "./../../assets/svg/undraw_page_not_found.svg";
import "./notFound.css";

export default function NotFound() {
    return (
        <div id="not-found" className="container d-flex flex-column align-items-center py-5">
            <img src={ ImgPageNotFound } alt="404 - Page Not Found Illustration" />
            <h1 className="text-center">Página não encontrada.</h1>
            <nav>
                <p>Está perdido? Tente esses caminhos:</p>
                <Link to="/">Home</Link>
                <Link to="/favoritos">Meus Favoritos</Link>
            </nav>
        </div>
    );
}
