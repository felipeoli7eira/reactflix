import { Link } from "react-router-dom";

import "./header.css";

export default function Header() {
    return (
        <header id="header">
            <nav className="d-flex justify-content-evenly align-items-center p-2 bg-dark">
                <Link to="/" className="logoname-link" title="Ir para Home">
                    <span>React</span>
                    <span>Flix</span>
                </Link>
                <div className="container-links">
                    <Link to="/favoritos" className="btn btn-sm saved-films-button shadow-0">favoritos</Link>
                </div>
            </nav>
        </header>
    );
}
