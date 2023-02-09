import React from "react";
import "./selectInput.css";

const SelectInput = ({ defaultValue, defaultName, options, onChange }) => {
  return (
    <select onChange={onChange} className="select">
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
