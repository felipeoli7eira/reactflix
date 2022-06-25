import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Http, API_KEY, getPoster } from "./../../services/api";
import FilmNotFound from "./../FilmNotFound";
import {
    setFavorite,
    removeFromFavorites,
    isFavoriteMovie,
} from "./../../services/favoriteMovies";

import "./movie.css";

function Loading() {
    return (
        <div className="container">
            <SkeletonTheme>
                <Skeleton height={250} baseColor="#dddddd" highlightColor="#ffffff" />
                <Skeleton height={50} baseColor="#dddddd" highlightColor="#ffffff" />
            </SkeletonTheme>
        </div>
    );
}

export default function Movie() {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [fetchError, setFetchError] = useState(false);
    const [movieNotFound, setMovieNotFound] = useState(false);

    const [isFav, setIsFav] = useState(false);

    const saveFav = (movie) => {
        setFavorite(movie);
        setIsFav(true);
    };

    const removeFav = (id) => {
        removeFromFavorites(id);
        setIsFav(false);
    };

    useEffect(() => {
        async function fetchFilm() {
            await Http.get("/movie/" + id, { params: { api_key: API_KEY } })
                .then((res) => setMovie(res.data))
                .catch(() => {
                    setFetchError(true);
                    setMovieNotFound(true);
                });
            }

            fetchFilm();
            setIsFav(isFavoriteMovie());
            // return () => { console.log('component unmount') }
        }
    , []);

    function MovieDetails({movie}) {
        return (<>
            <div className="movie-backdrop rounded-1 shadow shadow-3 position-relative" style={{ backgroundImage: 'url(' + getPoster(movie.backdrop_path) + ')' }} >
                <div className="movie-details position-absolute w-50 p-3 text-white d-flex flex-column align-items-start gap-2">
                    <span className="movie-release-date">
                        {new Date(movie.release_date).toLocaleDateString()}
                    </span>
                    <h1 className="m-0">{movie.original_title}</h1>
                    <p className="m-0">{movie.overview}</p>

                    <div className="genres d-flex gap-2">
                        {movie.genres.map(g => <span key={g.id} className="badge-movie">{g.name}</span>)}
                    </div>

                    <span className="d-block">⭐ {movie.vote_average}</span>

                    {
                        movie.adult && (
                            <div className="d-flex justify-content-end w-100">
                                <img
                                    loading="lazy"
                                    width={50}
                                    src="https://logodownload.org/wp-content/uploads/2017/07/classificacao-18-anos-logo.png"
                                    alt="+18"
                                />
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="shadow shadow-3 p-3 d-flex gap-3 align-items-center bg-white">
                {movie.production_companies.map(companie => {
                    if (companie.logo_path) {
                        return (<img key={companie.id} loading="lazy" width={60} src={getPoster(companie.logo_path)} alt={companie.name} />);
                    }

                    return (<p key={companie.id} className="m-0 text-muted">{companie.name}</p>);
                })}
            </div>

            <div className="mt-5 d-flex justify-content-between gap-2">
                {
                    isFav || isFavoriteMovie(movie.id) ?
                    (<button className="btn btn-lg btn-remove-from-favorites" onClick={() => removeFav(movie.id)}>remover dos favoritar</button>)
                    :
                    (<button className="btn btn-lg btn-save-movie" onClick={() => saveFav(movie)}>favoritar</button>)
                }

                <nav className="d-flex gap-3">
                    {
                        "homepage" in movie &&
                        (<a href={movie.homepage} target="_blank" rel="noreferrer" className="btn btn-lg movie-link-homepage">{movie.original_title}</a>)
                    }
                    <a href={`https://youtube.com/results?search_query=${movie.title} trailer`} target="_blank" rel="noreferrer" className="btn btn-lg movie-link-homepage">Trailer</a>
                </nav>
            </div>
        </>);
    }

    return (
        <div className="container my-4" id="movie">
            {fetchError && <FilmNotFound />}

            {Object.keys(movie).length === 0 && !movieNotFound && <Loading />}

            {Object.keys(movie).length > 0 && <MovieDetails movie={movie} />}
        </div>
    );
}
