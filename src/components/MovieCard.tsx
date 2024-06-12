import './MovieCard.css'
import { Movie } from './../types';
import MovieDetails from './MovieDetails'
import { useState } from 'react';

interface Props {
    movie: Movie
}

const MovieCard = (props: Props) => {
    const [isMovieDetailsOpen, setIsMovieDetailsOpen] = useState<boolean>(false);
    const openMovieDetails = () => {
        setIsMovieDetailsOpen(true)
    }
    const closeMovieDetails = () => {
        setIsMovieDetailsOpen(false)
    }

    return (
        <>
            <div className="MovieCard" onClick={openMovieDetails}>
                <img draggable="false" className='MoviePoster' src={"https://image.tmdb.org/t/p/w500/" + props.movie.poster_path} />
                <p className='MovieTitle'>{props.movie.title}</p>
                <p className='MovieRating'>{props.movie.vote_average.toFixed(1)}</p>
            </div>
            <MovieDetails movie={props.movie} isOpen={isMovieDetailsOpen} closeModalFunction={closeMovieDetails} />
        </>

    )
}

export default MovieCard
