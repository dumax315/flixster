import './Dropdown.css'


interface Props {
    currentValue: string,
    handleValueChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    selectionName: string;
}

// TODO make the dropdown options dynamic (so the component can be used in the filter options as well)
const Dropdown = ({ currentValue, handleValueChange, selectionName }: Props) => {
    return (
        <div>
            <label className="dropdownLabel" htmlFor={selectionName}>{selectionName}</label>
                <select id={selectionName} className="dropdown" value={currentValue} onChange={handleValueChange}>
                    <option value="popularity.desc">Popularity</option>
                    <option value="revenue.desc">Revenue</option>
                    <option value="title.asc">Title A-Z</option>
                    <option value="title.desc">Title Z-A</option>
                    <option value="primary_release_date.asc">Oldest-Newest</option>
                    <option value="primary_release_date.desc">Newest-Oldest</option>
                    <option value="vote_average.desc">Highest Rated</option>
                    <option value="vote_count.desc">Most Votes</option>
                </select>
        </div>

    )
}

export default Dropdown
