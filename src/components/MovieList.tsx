import './MovieList.css'
import MovieCard from './MovieCard'
import { useEffect, useState } from 'react';
import { Movie } from './../types';

interface Props {
    searchQuery: string,
    currentSort: string,
    movieDBPageNumber: number,
    setMovieDBPageNumber: (pageNumber:number) => void,
}

const MovieList = ({ searchQuery, currentSort, movieDBPageNumber, setMovieDBPageNumber }: Props) => {
    const [moviesJSON, setMoviesJSON] = useState<Movie[]>([]);

    const loadMovies = async () => {

        let url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US`;
        if (searchQuery !== '') {
            url = `https://api.themoviedb.org/3/search/movie?query=${encodeURI(searchQuery)}`

        }

        url += `&sort_by=${currentSort}`;
        url += `&page=${movieDBPageNumber}`;
        url += `&api_key=${import.meta.env.VITE_API_KEY}`
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
            }
        };
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        if (movieDBPageNumber > 1) {
            setMoviesJSON(moviesJSON.concat(data.results));
        } else {
            setMoviesJSON(data.results);
        }
    }

    useEffect(() => {
        loadMovies();
    }, [movieDBPageNumber, searchQuery, currentSort]);

    return (
        <div className='bodyContainer'>
            <h2>Movie List</h2>
            <div className="movieList">
                {moviesJSON.map(function (movie, i) {
                    return (
                        <MovieCard movie={movie} key={i} />
                    )
                })}
            </div>
            <button className="loadMore" onClick={() => { setMovieDBPageNumber(movieDBPageNumber + 1) }}>Load More</button>
        </div>
    )
}

export default MovieList
