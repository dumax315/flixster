import './MovieList.css'
import MovieCard from './MovieCard'
import { useEffect, useState } from 'react';
import { GenresIds, Movie, UserData, UserDataKey } from './../types';
import SideBarButton from './forms/SideBarButton';
import SideBar from './bodyParts/SideBar';
import { onDiscover, onQuery } from './onMovieList.telefunc.ts';


interface Props {
    searchQuery: string,
    currentSort: string,
    movieDBPageNumber: number,
    setMovieDBPageNumber: (pageNumber: number) => void,
    selectedOptions: string[],
}

const MovieList = ({ searchQuery, currentSort, movieDBPageNumber, setMovieDBPageNumber, selectedOptions }: Props) => {
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

        // Clears the page if the query has changed (instead of new page)
        if (movieDBPageNumber == 1) {
            setMoviesJSON([])
        }

        let data:Movie[] = [];

        if (searchQuery == '') {
            let url = `&sort_by=${currentSort}&page=${movieDBPageNumber}`;
            if (selectedOptions.length > 0) {
                url += `&with_genres=${selectedOptions.map((value)=>GenresIds[value]).join(',')}`;
            }
            data = await onDiscover(url);

        }else{
            data = await onQuery(`${encodeURI(searchQuery)}`);
        }

        if (movieDBPageNumber > 1) {
            setMoviesJSON((prev) => { return [...prev, ...data] });
        } else {
            setMoviesJSON(data);
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
    }, [movieDBPageNumber, searchQuery, currentSort, selectedOptions]);
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
                <div className="loadMoreContainer">
                    {loading ? <div className="loading">Loading...</div> : null}
                    {/* increments the page number when load More is clicked */}
                    {/* maybe this should be new function call incrementmoviedb */}
                    <button className="loadMore" onClick={() => { setMovieDBPageNumber(movieDBPageNumber + 1) }}>Load More</button>
                </div>
            </div>


        </main>
    )
}

export default MovieList
