import React, { useState } from "react"
import Multiselect from 'multiselect-react-dropdown';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

const AddStores=()=>{

}
const AddProductDetails=()=>{

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');
  
    const handleInputChange = (newValue) => {
      setInputValue(newValue);
    };
  
    const handleCreateOption = (inputValue) => {
      const newOption = {
        label: inputValue,
        value: inputValue,
      };
      setSelectedOptions([...selectedOptions, newOption]);
    };
  
    return (
      <CreatableSelect
        isClearable
        isMulti
        options={selectedOptions}
        value={selectedOptions}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onCreateOption={handleCreateOption}
      />
    );
}

const StoreManagement=()=>{
    return(
        <div>
     <AddProductDetails/>
        </div>
    )
}

export default StoreManagement