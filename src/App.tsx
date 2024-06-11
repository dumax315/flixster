import './App.css'
import Header from './components/bodyParts/Header'
import Footer from './components/bodyParts/Footer'
import MovieList from './components//MovieList'
import { useState } from 'react';
import FiltersAndSearch from './components/forms/FiltersAndSearch';

function App() {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [movieDBPageNumber, setMovieDBPageNumber] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentSort, setCurrentSort] = useState<string>('popularity.desc');


  // handler functions for the FiltersAndSearch
  const handlerSearchSwitch = (isSearchingData: boolean) => {
    setIsSearching(isSearchingData)
  }
  const handleSetSearchQuery = (searchQueryData: string) => {
    setSearchQuery(searchQueryData)
  }
  const handleSetCurrentSort = (currentSortData: string) => {
    setCurrentSort(currentSortData)
  }

  // handler functions for the MovieList
  const handleSetMovieDBPageNumber = (pageNumber: number) => {
    setMovieDBPageNumber(pageNumber)
  }

  return (
    <>
      <Header />
      <FiltersAndSearch
        isSearching={isSearching}
        searchQuery={searchQuery}
        setSearchQuery={handleSetSearchQuery}
        setIsSearching={handlerSearchSwitch}
        currentSort={currentSort}
        setCurrentSort={handleSetCurrentSort}
      />
      <MovieList
        searchQuery={searchQuery}
        currentSort={currentSort}
        movieDBPageNumber={movieDBPageNumber}
        setMovieDBPageNumber={handleSetMovieDBPageNumber}
      />
      <Footer />
    </>
  )
}

export default App
