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
    const [loading, setLoading] = useState(true);

    const loadMovies = async () => {
        setLoading(true)

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
        // Clears the page if the query has changed (instead of new page)
        if(movieDBPageNumber == 1) {
            setMoviesJSON([])
        }

        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        if (movieDBPageNumber > 1) {
            setMoviesJSON(moviesJSON.concat(data.results));
        } else {
            setMoviesJSON(data.results);
        }
        setLoading(false)
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
                {loading ? <div className="loading">Loading...</div> : null}
            </div>
            <button className="loadMore" onClick={() => { setMovieDBPageNumber(movieDBPageNumber + 1) }}>Load More</button>
        </div>
    )
}

export default MovieList
