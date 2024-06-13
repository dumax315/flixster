import "./CheckBoxList.css";

interface Props {
    options: string[];
}

const CheckBoxList = ({ options }: Props) => {


    return (
        <div className="checkBoxList">
            {options.map((option, index) => {
                return (
                    <label className="container" key={index}>{option}
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                    </label>
                )
            }
            )}
        </div>
    )



}

export default CheckBoxList
