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
                    <option value="original_title.asc">original_title.asc</option>
                    <option value="original_title.desc">original_title.desc</option>
                    {/* <option value="popularity.asc">popularity.asc</option> */}
                    <option value="popularity.desc">popularity.desc</option>
                    {/* <option value="revenue.asc">revenue.asc</option> */}
                    <option value="revenue.desc">revenue.desc</option>
                    <option value="primary_release_date.asc">primary_release_date.asc</option>
                    <option value="title.asc">title.asc</option>
                    <option value="title.desc">title.desc</option>
                    <option value="primary_release_date.desc">primary_release_date.desc</option>
                    {/* <option value="vote_average.asc">vote_average.asc</option> */}
                    <option value="vote_average.desc">vote_average.desc</option>
                    {/* <option value="vote_count.asc">vote_count.asc</option> */}
                    <option value="vote_count.desc">vote_count.desc</option>
                </select>
        </div>

    )
}

export default Dropdown
