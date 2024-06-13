import './App.css'
import Header from './components/bodyParts/Header'
import Footer from './components/bodyParts/Footer'
import MovieList from './components//MovieList'
import { useEffect, useState } from 'react';
import FiltersAndSearch from './components/forms/FiltersAndSearch';

function App() {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [movieDBPageNumber, setMovieDBPageNumber] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentSort, setCurrentSort] = useState<string>('popularity.desc');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);


  // These are functions because https://blog.stackademic.com/dont-pass-setstate-as-a-prop-2cc2b187d323 said not to pass setState as a prop
  // handler functions for the FiltersAndSearch
  const handlerSearchSwitch = (isSearchingData: boolean) => {
    setMovieDBPageNumber(1)
    setIsSearching(isSearchingData)
  }
  const handleSetSearchQuery = (searchQueryData: string) => {
    setMovieDBPageNumber(1)
    setSearchQuery(searchQueryData)
  }
  const handleSetCurrentSort = (currentSortData: string) => {
    setMovieDBPageNumber(1)
    setCurrentSort(currentSortData)
  }

  const handleGenreInputChange = (genreOptions:string[]) => {
    setSelectedOptions(genreOptions);
  }

  // handler function for the MovieList
  const handleSetMovieDBPageNumber = (pageNumber: number) => {
    setMovieDBPageNumber(pageNumber)
  }

  useEffect(() => {
    setMovieDBPageNumber(1);
  }, [selectedOptions])


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
        selectedOptions={selectedOptions}
        setSelectedOptions={handleGenreInputChange}
      />
      <MovieList
        searchQuery={searchQuery}
        currentSort={currentSort}
        movieDBPageNumber={movieDBPageNumber}
        setMovieDBPageNumber={handleSetMovieDBPageNumber}
        selectedOptions={selectedOptions}
      />
      <Footer />
    </>
  )
}

export default App
