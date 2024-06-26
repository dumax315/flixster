import './MovieCard.css'
import { Movie, UserDataKey } from './../types';
import MovieDetails from './MovieDetails'
import { useState } from 'react';

interface Props {
    movie: Movie,
    toggleUserData: (playlist_id: number, add: boolean, userDataList: UserDataKey) => void;
    liked: boolean,
    watched: boolean,
    alwaysShowLike?: boolean
}

const MovieCard = ({ movie, toggleUserData, liked, watched, alwaysShowLike = false }: Props) => {
    const [isMovieDetailsOpen, setIsMovieDetailsOpen] = useState<boolean>(false);
    const [hideButtons, setHideButtons] = useState<boolean>(true);
    // if null set to false (that is what ?? does)


    const openMovieDetails = () => {
        setIsMovieDetailsOpen(true)
    }
    const closeMovieDetails = () => {
        setIsMovieDetailsOpen(false)
    }

    // handles the butten clicks and passes along toggle to toggleUserData
    // TODO these functions are too similar, could probably be combined
    const toggleLiked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // stop propagation so that the card doesn't get clicked
        event.stopPropagation();
        // movie.liked = !movie.liked;
        toggleUserData(movie.id, !liked, "likedMovies")
    }

    const toggleWatched = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // stop propagation so that the card doesn't get clicked
        event.stopPropagation();
        // movie.watched = !movie.watched;
        toggleUserData(movie.id, !watched, "watchedMovies")
    }
    return (
        <>
            <article className="MovieCard" onClick={openMovieDetails}>
                <figure className='MoviePoster'>
                     <div className='MoviePosterImg' />
                    <img onLoad={() => setHideButtons(false)} draggable="false" className='MoviePosterImg' alt={movie.title + " poster"} src={
                         (movie.poster_path != null ? "https://image.tmdb.org/t/p/w500/" + movie.poster_path : "/noPoster.webp")
                    } />

                    <div className={'togglelistButtons ' + (alwaysShowLike ? "showButtonsAlways " : "") + (hideButtons ? "hiddenButton " : "")}>
                        <button aria-label={liked ? "unlike" : "like"} style={{marginBottom:".4em"}} className='toggleButton' onClickCapture={toggleLiked}><img alt="like button image" className="toggleButtonImg" src={liked ? "/heart-filled.svg" : "/heart-outline.svg"}></img></button>
                        <button aria-label={watched ? "unWatched" : "watched"} className='toggleButton' onClickCapture={toggleWatched}><img alt="watched button image" className="toggleButtonImg" src={watched ? "/tv-checked.svg" : "/tv-unchecked.svg"}></img></button>
                    </div>
                </figure>
                <p className='MovieTitle'>{movie.title}</p>
                <div className='MovieRatingCircle'>
                    <p className='MovieRating'>{(movie.vote_average == undefined ? 0 : movie.vote_average).toPrecision(2)}</p>
                </div>

            </article>
            {isMovieDetailsOpen ? <MovieDetails movie={movie} isOpen={isMovieDetailsOpen} closeModalFunction={closeMovieDetails} /> : null}
        </>

    )
}

export default MovieCard
