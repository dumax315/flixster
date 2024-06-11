import { useEffect, useState } from 'react';
import './SearchBar.css'

interface Props {
    searchQuery: string,
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    closeSearch: () => void;
}

const SearchBar = (props: Props) => {
    const [isSearching, setIsSearching] = useState<boolean>(false);

    const handleOpenSearchClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        setIsSearching(true);
    };

    const handleCloseSearchClick = (): void => {
        props.closeSearch();
        setIsSearching(false);
    }

    useEffect(() => {
        if (props.searchQuery.length > 0) {
        }
    }, [props.searchQuery]);

    // return either an open search button or a search bar depending on the state of isSearching
    // TODO add closing animation
    if (isSearching) {
        return (
            <>
                <input type="text" value={props.searchQuery} onChange={props.handleSearchChange} placeholder="Search" />
                <button onClick={handleCloseSearchClick}>Back to Explore</button>
            </>
        )
    }
    else {
        return (
            <>
                <button className="" onClick={handleOpenSearchClick}>
                    Search
                </button>

            </>
        )

    }
}

export default SearchBar
