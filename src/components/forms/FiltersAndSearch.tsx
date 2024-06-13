import CheckBoxList from './CheckBoxList';
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
                <div>
                    <SearchBar handleSearchChange={handleSearchChange} searchQuery={searchQuery}/>
                    <button className="navButton" onClick={closeSearch}>Back to Explore</button>
                </div>
            </nav>
        )
    } else {
        return (
            <nav className='filtersAndSearch'>
                <div className='filters'>
                    <Dropdown currentValue={currentSort} handleValueChange={handleSortChange} />
                    <button className="navButton" onClick={openSearch}>Go to Search</button>
                </div>
                <CheckBoxList options={["Action","Adventure","Animation","Comedy","Crime","Documentary","Drama","Family","Fantasy","History","Horror","Music","Mystery","Romance","Science Fiction","TV Movie","Thriller","War","Western"]} />

            </nav>
        )
    }



}

export default FiltersAndSearch
