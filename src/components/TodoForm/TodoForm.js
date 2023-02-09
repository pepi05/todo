import React from "react";
import { useTodoContext } from "../../context/todoContext";
import "./todoForm.css";

const TodoForm = () => {
  const {
    inputRef,
    onInputChange,
    inputValue,
    addTodo,
    cancelUpdate,
    updateTodo,
    isEditClicked,
  } = useTodoContext();

  return (
    <div className="formContainer">
      <input
        ref={inputRef}
        className="formInput"
        type="text"
        id="text"
        onChange={onInputChange}
        value={inputValue}
        placeholder="Enter Todo"
      />
      {!isEditClicked ? (
        <button className="addButton" onClick={() => addTodo(inputValue)}>
          Add
        </button>
      ) : (
        <>
          <button className="cancelUpdateButton" onClick={cancelUpdate}>
            Cancel
          </button>
          <button className="updateButton" onClick={updateTodo}>
            Update
          </button>
        </>
      )}
    </div>
  );
};

export default TodoForm;
