import './MovieList.css'
import MovieCard from './MovieCard'
import { useEffect, useState } from 'react';
import { Movie, UserData, UserDataKey } from './../types';

interface Props {
    searchQuery: string,
    currentSort: string,
    movieDBPageNumber: number,
    setMovieDBPageNumber: (pageNumber: number) => void,
}

const MovieList = ({ searchQuery, currentSort, movieDBPageNumber, setMovieDBPageNumber }: Props) => {
    const [moviesJSON, setMoviesJSON] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<UserData>();

    /**
     * Loads the movies from the MovieDB API, based on the current search query and the current sort
     * When the current page number is not 1, it will concat the new results to the existing ones
     * TODO: investage repeat movies at beginings and endings of pages
     */
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
        if (movieDBPageNumber == 1) {
            setMoviesJSON([])
        }

        const response = await fetch(url, options);
        const data = await response.json();
        if (movieDBPageNumber > 1) {
            setMoviesJSON(moviesJSON.concat(data.results));
        } else {
            setMoviesJSON(data.results);
        }
        setLoading(false);
    }

    const storeUserDataLocalStorage = async () => {
        localStorage.setItem('userData', JSON.stringify(userData));
    }

    const toggleUserData = async (movie_id: number, add: boolean, userDataList: UserDataKey) => {

        if (userData == undefined) {
            return;
        }
        let userDataTemp: UserData = userData;
        if (add) {
            userDataTemp[userDataList].push(movie_id);
        }
        else {
            userDataTemp[userDataList].splice(userDataTemp[userDataList].indexOf(movie_id), 1)
        }
        await setUserData(userDataTemp);
        storeUserDataLocalStorage();
    }

    useEffect(() => {
        loadMovies();
    }, [movieDBPageNumber, searchQuery, currentSort]);

    /**
     * On page load checks for userData in local storage,
     * Creates empty userData if it does not exist or if it does exist, sets the userData to the JSON.parsed local storage value
     */
    useEffect(() => {
        if (localStorage.getItem("userData") == undefined) {
            setUserData({
                likedMovies: [],
                watchedMovies: [],
            })
        } else {
            setUserData(JSON.parse(localStorage.userData));
        }
    }, [])

    return (
        <div className='bodyContainer'>
            <div className="movieList">

                {moviesJSON.map(function (movie, i) {
                    // set the liked and watched values to true or false based on the saved Userdata if they are not set
                    if (movie.liked == null) {
                        if (userData?.likedMovies.includes(movie.id)) {
                            movie.liked = true;
                        } else {
                            movie.liked = false;
                        }
                    }
                    if (movie.watched == null) {
                        if (userData?.watchedMovies.includes(movie.id)) {
                            movie.watched = true;
                        } else {
                            movie.liked = false;
                        }
                    }

                    return (
                        <MovieCard toggleUserData={toggleUserData} movie={movie} key={i} />
                    )
                })}
                {loading ? <div className="loading">Loading...</div> : null}
            </div>
            {/* increments the page number when load More is clicked */}
            <button className="loadMore" onClick={() => { setMovieDBPageNumber(movieDBPageNumber + 1) }}>Load More</button>
        </div>
    )
}

export default MovieList
