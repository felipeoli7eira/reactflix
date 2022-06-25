import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Http, API_KEY, getPoster } from "./../../services/api";

import HomeSkeleton from "../../components/HomeSkeleton";

// page style
import "./home.css";

export default function Home() {
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async function () {
        let nowPlayingMovies = await Http.get(`/movie/now_playing?api_key=${API_KEY}`);
        setNowPlayingMovies(nowPlayingMovies.data.results);
        setLoading(false);
        // console.log(nowPlayingMovies.data.results);
        })();
    }, []);

    return (
        <div id="home">
            <div className="container">
                <h1 className="m-0 py-3 text-muted now-playing-title">Em cartaz</h1>
            </div>

            <main className="container gap-3 p-0 py-3 d-flex flex-wrap justify-content-center">
                {!loading && nowPlayingMovies.map((movie) => {
                    return (
                    <div className="movie-card" key={movie.id}>
                        <span className={movie.vote_average <= 6.9 ? "note-yellow" : "note-green"}>{movie.vote_average}</span>
                        <Link to={"/filme/" + movie.id}>
                            <img
                                className="shadow shadow-2"
                                src={getPoster(movie.poster_path)}
                                alt={movie.original_title}
                                loading="lazy"
                            />
                        </Link>
                        <div className="movie-title-overview p-1 shadow shadow-2">
                            <p className="m-0 title">{movie.original_title}</p>
                            <p className="m-0 sub-title" title={movie.overview}>
                                {movie.overview}
                            </p>
                        </div>
                    </div>
                    );
                })}
            </main>
            {loading && <HomeSkeleton />}
        </div>
    );
}
