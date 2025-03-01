import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const getPoster = (poster) => "https://image.tmdb.org/t/p/original/" + poster;
const Http = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export { Http, API_KEY, getPoster };
