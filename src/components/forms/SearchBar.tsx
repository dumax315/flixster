import { useEffect } from 'react';
import './SearchBar.css'

interface Props {
    searchQuery: string,
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({searchQuery, handleSearchChange}: Props) => {

    useEffect(() => {
        if (searchQuery.length > 0) {
        }
    }, [searchQuery]);

    // return either an open search button or a search bar depending on the state of isSearching
    return (
        <>
            <input className="searchBar" type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search" />
        </>
    )


}

export default SearchBar
