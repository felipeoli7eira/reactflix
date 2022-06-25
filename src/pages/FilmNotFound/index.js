import ImgPageNotFound from "./../../assets/svg/undraw_home_cinema.svg";
import { Link } from "react-router-dom";

export default function FilmNotFound() {
    return (
        <div id="not-found" className="d-flex flex-column align-items-center mx-auto my-3">
            <img src={ ImgPageNotFound } alt="404 - Film Not Found Illustration" />
            <h1 className="text-center text-white">Filme não encontrado</h1>
            <nav>
                <p className="m-0 d-flex text-white">O filme que você quer pode estar listado na <Link to="/" className="ms-1">Home</Link></p>
            </nav>
        </div>
    );
}