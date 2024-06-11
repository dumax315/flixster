import './Dropdown.css'


interface Props {
    currentValue: string,
    handleValueChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown = (props: Props) => {
    return (
        <>

            <select value={props.currentValue} onChange={props.handleValueChange}>
                <option value="original_title.asc">original_title.asc</option>
                <option value="original_title.desc">original_title.desc</option>
                {/* <option value="popularity.asc">popularity.asc</option> */}
                <option value="popularity.desc">popularity.desc</option>
                <option value="revenue.asc">revenue.asc</option>
                <option value="revenue.desc">revenue.desc</option>
                <option value="primary_release_date.asc">primary_release_date.asc</option>
                <option value="title.asc">title.asc</option>
                <option value="title.desc">title.desc</option>
                <option value="primary_release_date.desc">primary_release_date.desc</option>
                {/* <option value="vote_average.asc">vote_average.asc</option> */}
                <option value="vote_average.desc">vote_average.desc</option>
                <option value="vote_count.asc">vote_count.asc</option>
                <option value="vote_count.desc">vote_count.desc</option>
            </select>
        </>

    )
}

export default Dropdown
