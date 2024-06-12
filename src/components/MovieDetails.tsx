import './MovieDetails.css'
import { Movie, Genres } from './../types';
import { useEffect, useRef, useState } from 'react';

interface Props {
    movie: Movie,
    isOpen: boolean,
    closeModalFunction: () => void;
}

const MovieDetails = (props: Props) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const videoRef = useRef<HTMLIFrameElement>(null);
    const [videoUrl, setVideoUrl] = useState<string>("");

    const getYoutubeCode = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
            }
        };
        let url = `https://api.themoviedb.org/3/movie/${props.movie.id}/videos?api_key=${import.meta.env.VITE_API_KEY}`;
        const response = await fetch(url, options);
        const data = await response.json();
        const youtubeCode = data.results[0].key;
        setVideoUrl(`https://www.youtube.com/embed/${youtubeCode}`);
    }

    useEffect(() => {
        if (props.isOpen) {
            dialogRef.current?.showModal();
            getYoutubeCode();
        }
        else{
            dialogRef.current?.close();
        }
    }, [props.isOpen])

    return (
        <dialog ref={dialogRef} className='MovieDetails'>
            <div className='flexContainer'>

                <img draggable="false" className='movieDetailsImg' src={"https://image.tmdb.org/t/p/w500/" + props.movie.poster_path} alt={props.movie.title + "poster"} />
                <div>
                    <button onClick={props.closeModalFunction}>X</button>
                    <h2>{props.movie.title}</h2>
                    <p>Release date: {props.movie.release_date}</p>
                    <p>{props.movie.overview}</p>
                    <p>Genres: {props.movie.genre_ids.map((value) => {return Genres[value]}).join(" ")}</p>

                    <iframe className='youtubeVideo' ref={videoRef} width="560" height="315" src={videoUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
            </div>
        </dialog>
    )
}

export default MovieDetails
