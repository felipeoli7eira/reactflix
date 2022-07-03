import axios from "axios";

const API_KEY = process.env.API_KEY; // your api key here
const getPoster = poster => "https://image.tmdb.org/t/p/original/" + poster;
const Http = axios.create(
    {
        baseURL: "https://api.themoviedb.org/3"
    }
);

export { Http, API_KEY, getPoster };