import './MovieList.css'
import MovieCard from './MovieCard'
import { useEffect, useState } from 'react';
import { Movie, UserData, UserDataKey } from './../types';
import SideBarButton from './forms/SideBarButton';
import SideBar from './bodyParts/SideBar';

interface Props {
    searchQuery: string,
    currentSort: string,
    movieDBPageNumber: number,
    setMovieDBPageNumber: (pageNumber: number) => void,
}

const MovieList = ({ searchQuery, currentSort, movieDBPageNumber, setMovieDBPageNumber }: Props) => {
    const [moviesJSON, setMoviesJSON] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<UserData>({ likedMovies: [], watchedMovies: [] });
    const [sidebarOpen, setSidebarOpen] = useState(false);

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
            setMoviesJSON((prev) => {return [...prev, ...data.results]});
        } else {
            setMoviesJSON(data.results);
        }
        setLoading(false);
    }

    const storeUserDataLocalStorage = async (userDataTemp: UserData) => {
        localStorage.setItem('userData', JSON.stringify(userDataTemp));
    }

    const toggleUserData = (movie_id: number, add: boolean, userDataList: UserDataKey) => {

        if (userData == undefined) {
            return;
        }
        setUserData((prev) => {
            const userDataTemp = { ...prev };

            if (add) {
                userDataTemp[userDataList].push(movie_id);
            }
            else {
                userDataTemp[userDataList].splice(userDataTemp[userDataList].indexOf(movie_id), 1)
            }

            storeUserDataLocalStorage(userDataTemp);
            return userDataTemp
        });
    }

    /**
     * Opens and closes the sidebar when SideBarButton is clicked
     */
    const toggleSideBarOpen = () => {
        setSidebarOpen((prev) => !prev);
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
        <main className='bodyContainer'>
            <SideBarButton isOpen={sidebarOpen} onClick={toggleSideBarOpen} />
            <SideBar toggleUserData={toggleUserData} userData={userData} isOpen={sidebarOpen} />
            <div className='movieListContainer'>
                <section className="movieList">
                    {moviesJSON.map(function (movie, i) {
                        // set the liked and watched values to true or false based on the saved Userdata if they are not set

                        return (
                            <MovieCard liked={userData.likedMovies.includes(movie.id)} watched={userData.watchedMovies.includes(movie.id)} toggleUserData={toggleUserData} movie={movie} key={i} />
                        )
                    })}
                </section>
                {loading ? <div className="loading">Loading...</div> : null}
                {/* increments the page number when load More is clicked */}
                {/* maybe this should be new function call incrementmoviedb */}
                <button className="loadMore" onClick={() => { setMovieDBPageNumber(movieDBPageNumber + 1) }}>Load More</button>
            </div>


        </main>
    )
}

export default MovieList
