import { useEffect } from 'react';
import './SearchBar.css'

interface Props {
    searchQuery: string,
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = (props: Props) => {

    useEffect(() => {
        if (props.searchQuery.length > 0) {
        }
    }, [props.searchQuery]);

    // return either an open search button or a search bar depending on the state of isSearching
    // TODO add closing animation

    return (
        <>
            <input type="text" value={props.searchQuery} onChange={props.handleSearchChange} placeholder="Search" />

        </>
    )


}

export default SearchBar
