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

const MovieCard = ({ movie, toggleUserData, liked, watched, alwaysShowLike=false }: Props) => {
    const [isMovieDetailsOpen, setIsMovieDetailsOpen] = useState<boolean>(false);
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
                <img draggable="false" className='MoviePoster' src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} />
                <p className='MovieTitle'>{movie.title}</p>
                <div className='MovieRatingCircle'>
                    <p className='MovieRating'>{movie.vote_average.toFixed(1)}</p>
                </div>
                <div className={'togglelistButtons ' + (alwaysShowLike ? "showButtonsAlways":"")}>
                    <button onClickCapture={toggleLiked}>{liked ? "unlike" : "like"}</button>
                    <button onClickCapture={toggleWatched}>{watched ? "unwatched" : "watched"}</button>
                </div>
            </article>
            <MovieDetails movie={movie} isOpen={isMovieDetailsOpen} closeModalFunction={closeMovieDetails} />
        </>

    )
}

export default MovieCard
