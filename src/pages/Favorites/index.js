import { useEffect, useState } from "react";
import { getFavorites, removeFromFavorites } from "./../../services/favoriteMovies";
import { getPoster } from "./../../services/api";
import { Link } from "react-router-dom";

import illustration from "./../../assets/svg/undraw_video_streaming.svg";
import iconHeart from "./../../assets/png/heart.png";

import "./favorites.css";

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);

    function removeFav(id) {
        removeFromFavorites(id); // service
        setFavorites(getFavorites());
    }

    useEffect(() => setFavorites(getFavorites()), []);

    if (favorites.length === 0) {
        return (
            <div className="container py-5 d-flex align-items-center flex-column gap-3 empty-favorites">
                <img style={{ maxWidth: '20rem' }} src={illustration} alt="favorite Movies Empty" />
                <h3 className="m-0 font-weight-light text-white">Nenhum filme favoritado por enquanto...</h3>
            </div>
        );
    }

    return (
        <ul id="favorites" className="mt-1 px-2 list-group list-group-light py-2">
            {
                favorites.map (
                    fav => (
                        <li key={fav.id} className="list-group-item rounded-0 d-flex justify-content-between align-items-center">
                            <div className="poster-title-release-date d-flex gap-3">
                                <Link to={"/filme/" + fav.id}>
                                    <img width={60} src={getPoster(fav.poster_path)} alt={fav.title} />
                                </Link>
                                <div className="d-flex flex-column">
                                    <span className="fav-title">{fav.title}</span>
                                    <span className="fav-release-date">{new Date(fav.release_date).toLocaleDateString('pt-BR')}</span>
                                </div>
                            </div>
                            <button title={"remover " + fav.title + " dos favoritos"} className="btn shadow-0" onClick={() => removeFav(fav.id)}>
                                <img width={20} src={iconHeart} alt="Icon heart" />
                            </button>
                        </li>
                    )
                )
            }
        </ul>
    );
}
