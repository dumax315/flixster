import './MovieDetails.css'
import { Movie, Genres } from './../types';
import { useEffect, useRef, useState } from 'react';

interface Props {
    movie: Movie,
    isOpen: boolean,
    closeModalFunction: () => void;
}

const MovieDetails = ({movie, isOpen, closeModalFunction}: Props) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const videoRef = useRef<HTMLIFrameElement>(null);
    const [videoUrl, setVideoUrl] = useState<string>("");

    // Get the youtube url id from the themoviedb API
    // then set the iframe src with the youtube url
    const getYoutubeCode = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
            }
        };
        let url = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${import.meta.env.VITE_API_KEY}`;
        const response = await fetch(url, options);
        const data = await response.json();
        const youtubeCode = data.results[0].key;
        setVideoUrl(`https://www.youtube.com/embed/${youtubeCode}`);
    }

    useEffect(() => {
        if (isOpen) {
            dialogRef.current?.showModal();
            getYoutubeCode();
        }
        else{
            dialogRef.current?.close();
        }
    }, [isOpen])

    return (
        <dialog ref={dialogRef} className='MovieDetails'>
            <div className='flexContainer'>

                <img draggable="false" className='movieDetailsImg' src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} alt={movie.title + "poster"} />
                <div>
                    <button onClick={closeModalFunction}>X</button>
                    <h2>{movie.title}</h2>
                    <p>Release date: {movie.release_date}</p>
                    <p>{movie.overview}</p>
                    <p>Genres: {movie.genre_ids.map((value) => {return Genres[value]}).join(" ")}</p>

                    <iframe className='youtubeVideo' ref={videoRef} width="560" height="315" src={videoUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
            </div>
        </dialog>
    )
}

export default MovieDetails
