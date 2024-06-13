import { Genres } from "../../types";
import "./CheckBoxList.css";

interface Props {
    options: string[];
    selectedOptions: string[];
    setSelectedOptions: (selectedOptions: string[]) => void;
}

const CheckBoxList = ({ options, selectedOptions, setSelectedOptions }: Props) => {

    const handleGenreInputChange = (event: React.ChangeEvent<HTMLInputElement>, checkBoxValue:string) => {
        let newSelectionArray: string[] = [...selectedOptions];
        if(event.target.checked){
            newSelectionArray.push(checkBoxValue);
        }else{
            newSelectionArray = newSelectionArray.filter(item => item !== checkBoxValue);
        }
        setSelectedOptions(newSelectionArray);
    }

    return (
        <>
            {options.map((option, index) => {

                return (
                    <label className="container" key={index}>{option}
                        <input onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleGenreInputChange(event, option)} type="checkbox" />
                        <span className="checkmark"></span>
                    </label>
                )
            }
            )}
        </>
    )



}

export default CheckBoxList
