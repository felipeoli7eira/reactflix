import { toast } from "react-toastify";

function getFavorites() {
    return JSON.parse(localStorage.reactflixfavs || '[]');
}

function setFavorite(film) {
    let savedFilms = getFavorites();

    const alreadySaved = savedFilms.some(fav => fav.id === film.id);
    if (alreadySaved) {
        toast.warn('Este filme já está nos seus favoritos!');
        return false;
    }

    savedFilms.push(film);
    localStorage.reactflixfavs = JSON.stringify(savedFilms);
    toast.success('Prontinho! filme favoritado.');
    return true;
}

function removeFromFavorites(id) {
    let favs = getFavorites();
    let favsExceptSelected = favs.filter( fav => fav.id !== id );
    localStorage.reactflixfavs = JSON.stringify(favsExceptSelected);
    toast.error('Filme removido!');
    return true;
}

function isFavoriteMovie(id) {
    let savedFilms = getFavorites();

    const alreadySaved = savedFilms.some(fav => fav.id === id);
    if (alreadySaved) {
        return true;
    }

    return false;
}

export { setFavorite, getFavorites, removeFromFavorites, isFavoriteMovie }
