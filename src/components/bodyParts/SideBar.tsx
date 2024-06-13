import { useEffect, useState } from 'react';
import { Movie, UserData, UserDataKey } from '../../types';
import './SideBar.css'
import MovieCard from '../MovieCard';
import { onGetMovie } from '../onMovieList.telefunc';

interface Props {
    isOpen: boolean;
    userData?: UserData;
    toggleUserData: (movie_id: number, add: boolean, userDataList: UserDataKey) => void;
}

const SideBar = ({ isOpen, userData, toggleUserData }: Props) => {
    const [sideBarMovies, setSideBarMovies] = useState<Movie[]>([]);

    const loadSideBarMovies = async () => {

        if(userData == undefined){
            return;
        }
        let tempSideBarMovies:Movie[] = [...sideBarMovies];
        tempSideBarMovies = tempSideBarMovies.filter((item:Movie) => {
            return (userData.likedMovies.includes(item.id)) || (userData.watchedMovies.includes(item.id))
        });

        let lists:UserDataKey[] = ["likedMovies", "watchedMovies"];
        for(let currentList = 0; currentList < lists.length; currentList++) {
            for(let i = 0; i < userData[lists[currentList]].length; i++) {
                let movieIndex = tempSideBarMovies.findIndex((item:Movie) => {
                    return userData[lists[currentList]][i] == item.id;
                });
                if(movieIndex == -1){
                    const data = await onGetMovie(userData[lists[currentList]][i]);

                    let temp = data.genres!.map((genre: any) => {
                        // console.log(genre.id);
                        return genre.id;
                    });
                    // console.log(temp);
                    data.genre_ids = temp;
                    tempSideBarMovies.push(data)
                    movieIndex = tempSideBarMovies.length-1;
                    // console.log(data);
                }

            }

        };
        setSideBarMovies(tempSideBarMovies)
    }

    useEffect(() => {
        loadSideBarMovies();
    }, [userData]);

    return (
        <aside className={'sideBar ' + (isOpen ? "" : "preload")}>
            <h2 className='sideBarTitle'>Liked and Watched movies</h2>
            <ul className='twoColumnSideBarList'>
            {sideBarMovies.map(function (movie, i) {
                    // set the liked and watched values to true or false based on the saved Userdata if they are not set

                    return (
                        <MovieCard alwaysShowLike={true} liked={userData!.likedMovies.includes(movie.id)} watched={userData!.watchedMovies.includes(movie.id)} toggleUserData={toggleUserData} movie={movie} key={"sideBarCard"+i} />
                    )
                })}
            </ul>
        </aside>

    )
}

export default SideBar
