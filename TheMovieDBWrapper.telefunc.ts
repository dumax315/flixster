export { Discover, Query, GetMovie }

import fetch from 'node-fetch'
import { Movie } from './src/types';

// Telefunction arguments are automatically validated
// at runtime: `params` is guaranteed to be a string.
async function Discover(params: string) : Promise<Movie[]> {

  let url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US`;

  url += `&api_key=${import.meta.env.VITE_API_KEY}`

  url += params

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    }
  };

  const response = await fetch(url, options);
  const data = await response.json() as { results: Movie[] };
  const movies = data.results;

  return movies;
}

async function Query(searchQuery: string) : Promise<Movie[]> {

  let url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}`;

  url += `&api_key=${import.meta.env.VITE_API_KEY}`

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    }
  };

  const response = await fetch(url, options);
  const data = await response.json() as { results: Movie[] };
  const movies = data.results;

  return movies;
}

async function GetMovie(movie_id: number) : Promise<Movie> {

  let url = `https://api.themoviedb.org/3/movie/${movie_id}?append_to_response=videos`;

  url += `&api_key=${import.meta.env.VITE_API_KEY}`

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    }
  };

  const response = await fetch(url, options);
  const data = await response.json() as Movie;

  return data;
}
