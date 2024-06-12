import './MovieCard.css'
import { Movie, UserDataKey } from './../types';
import MovieDetails from './MovieDetails'
import { ButtonHTMLAttributes, useEffect, useState } from 'react';

interface Props {
    movie: Movie,
    toggleUserData: (playlist_id: number, add: boolean, userDataList: UserDataKey) => void;
}

const MovieCard = ({ movie, toggleUserData }: Props) => {
    const [isMovieDetailsOpen, setIsMovieDetailsOpen] = useState<boolean>(false);
    // if null set to false (??)
    const [liked, setLiked] = useState<boolean>(movie.liked ?? false);
    const [watched, setWatched] = useState<boolean>(movie.watched ?? false);


    const openMovieDetails = () => {
        setIsMovieDetailsOpen(true)
    }
    const closeMovieDetails = () => {
        setIsMovieDetailsOpen(false)
    }

    const toggleLiked = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        movie.liked = !movie.liked;
        setLiked(movie.liked);
        toggleUserData(movie.id, movie.liked, "likedMovies")
    }

    const toggleWatched = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation();
        movie.watched = !movie.watched;
        setWatched(movie.watched);
        toggleUserData(movie.id, movie.watched, "watchedMovies")
    }

    return (
        <>
            <div className="MovieCard" onClick={openMovieDetails}>
                <img draggable="false" className='MoviePoster' src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} />
                <p className='MovieTitle'>{movie.title}</p>
                <p className='MovieRating'>{movie.vote_average.toFixed(1)}</p>
                <div className='togglelistButtons'>
                    <button onClickCapture={toggleLiked}>{liked ? "unlike" : "like"}</button>
                    <button onClickCapture={toggleWatched}>{watched ? "unwatched" : "watched"}</button>
                </div>
            </div>
            <MovieDetails movie={movie} isOpen={isMovieDetailsOpen} closeModalFunction={closeMovieDetails} />
        </>

    )
}

export default MovieCard
