import React from "react";
import "./selectInput.css";

const SelectInput = ({ onChange, id, defaultValue, defaultName, options }) => {
  return (
    <select onChange={onChange} id={id} className="select">
      <option defaultValue={defaultValue}>{defaultName}</option>
      {options.map((option) => {
        return (
          <option key={option.name} value={option.value}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
};

export default SelectInput;
