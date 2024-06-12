import Dropdown from './Dropdown';
import './FiltersAndSearch.css'
import SearchBar from './SearchBar';

interface Props {
    isSearching: boolean,
    setIsSearching: (isSearchingData: boolean) => void,
    searchQuery: string,
    setSearchQuery: (searchQueryData: string) => void,
    currentSort: string,
    setCurrentSort: (currentSortData: string) => void;
}

const FiltersAndSearch = ({ isSearching, setIsSearching, searchQuery, setSearchQuery, currentSort, setCurrentSort }: Props) => {
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    }

    const closeSearch = () => {
        setIsSearching(false);
        setSearchQuery("");
    }

    const openSearch = () => {
        setIsSearching(true);
    }

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setCurrentSort(event.target.value);
    }

    // return either an open search button or a search bar depending on the state of isSearching
    // TODO add closing animation
    if (isSearching) {
        return (
            <nav className='filtersAndSearch'>
                <SearchBar handleSearchChange={handleSearchChange} searchQuery={searchQuery}/>
                <button onClick={closeSearch}>Back to Explore</button>
            </nav>
        )
    } else {
        return (
            <nav className='filtersAndSearch'>
                <Dropdown currentValue={currentSort} handleValueChange={handleSortChange} />
                <button onClick={openSearch}>Go to Search</button>
            </nav>
        )
    }



}

export default FiltersAndSearch
