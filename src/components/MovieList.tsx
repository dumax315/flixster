import './MovieList.css'
import MovieCard from './MovieCard'
import { useEffect, useState } from 'react';
import { Movie } from './../types';
import SearchBar from './forms/SearchBar';
import Dropdown from './forms/Dropdown';

const MovieList = () => {
    const [moviesJSON, setMoviesJSON] = useState<Movie[]>([]);
    const [movieDBPageNumber, setMovieDBPageNumber] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentSort, setCurrentSort] = useState<string>('popularity.desc');
    const loadMovies = async () => {

        let url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US`;
        if(searchQuery !== ''){
            url = `https://api.themoviedb.org/3/search/movie?query=${encodeURI(searchQuery)}`

        }

        url +=  `&sort_by=${currentSort}`;
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
        if(movieDBPageNumber > 1){
            setMoviesJSON(moviesJSON.concat(data.results));
        }else{
            setMoviesJSON(data.results);
        }
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchQuery(event.target.value);
        setMovieDBPageNumber(1);
    };

    const closeSearch = () => {
        setSearchQuery('');
        setMovieDBPageNumber(1);
    }

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        console.log(event.target.value);
        setCurrentSort(event.target.value);

    }

    useEffect(() => {
        loadMovies();
    }, [movieDBPageNumber, searchQuery, currentSort]);

    return (
        <>
            <h2>Movie List</h2>
            {searchQuery === '' ? <Dropdown currentValue={currentSort} handleValueChange={handleSortChange} /> : null}
            <SearchBar searchQuery={searchQuery} handleSearchChange={handleSearchChange} closeSearch={closeSearch} />
            <div className="movieList">
                {moviesJSON.map(function (movie, i) {
                    return (
                        <MovieCard movie={movie} key={i} />
                    )
                })}
            </div>
            <button onClick={() => { setMovieDBPageNumber(movieDBPageNumber + 1) }}>Load More</button>
        </>
    )
}

export default MovieList
