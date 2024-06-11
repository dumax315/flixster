import './MovieDetails.css'
import { Movie, Genres } from './../types';
import { useEffect, useRef } from 'react';

interface Props {
    movie: Movie,
    isOpen: boolean,
    closeModalFunction: () => void;
}

const MovieDetails = (props: Props) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (props.isOpen) {
            dialogRef.current?.showModal();
        }
        else{
            dialogRef.current?.close();
        }
    }, [props.isOpen])

    return (
        // open={props.isOpen}
        <dialog ref={dialogRef} className='MovieDetails'>
            <div className='flexContainer'>

                <img draggable="false" className='movieDetailsImg' src={"https://image.tmdb.org/t/p/w500/" + props.movie.poster_path} alt={props.movie.title + "poster"} />
                <div>
                    <button onClick={props.closeModalFunction}>X</button>
                    <h2>{props.movie.title}</h2>
                    <p>Release date: {props.movie.release_date}</p>
                    <p>{props.movie.overview}</p>
                    <p>Genres: {props.movie.genre_ids.map((value) => {return Genres[value]}).join(" ")}</p>
                </div>
            </div>
        </dialog>
    )
}

export default MovieDetails
