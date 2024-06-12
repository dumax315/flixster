/** used in Movie Details to find a yt video to embed */
export interface Trailer {
    key: string,
    site: string,
    type: string,
    official: boolean,
}

/** Movie type based on the response data from themoviedb.org,
 */
export interface Movie {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
    runtime?: number,
}

/** Ensure type safety for the Genres object below */
interface GenresLookup {
    [key: number]: string
}

/** Genres from themoviedb.org, used to decode the genre_ids aspect of type Movie */
export const Genres: GenresLookup = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
}

/** Keys for the UserData object below, allow the keys to be pass into a function */
export type UserDataKey = "likedMovies" | "watchedMovies";

/** The UserData type which is stored in MovieList and JSON.stringified into local storage to gain persistence across reloads*/
export interface UserData {
    likedMovies: number[],
    watchedMovies: number[],
}
