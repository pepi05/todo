import React from "react";
import { AiOutlineCheck, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import "./todoItem.css";

const TodoItem = ({ todo, onEditClick, completeTodo, deleteTodo }) => {
  return (
    <div
      key={todo.id}
      className={`${!todo.active && "todoCompletedContainer"} todoContainer`}
    >
      <h2 className={`${!todo.active && "completedTodo"} todoName`}>
        {todo.name}
      </h2>
      <div className="todoIconsContainer">
        <AiOutlineEdit
          onClick={() => onEditClick(todo.name, todo.id)}
          className="icon"
          size={20}
        />
        <AiOutlineCheck
          onClick={() => completeTodo(todo.id)}
          className="icon"
          size={20}
          color="green"
        />
        <AiOutlineDelete
          onClick={() => deleteTodo(todo.id)}
          className="icon"
          size={20}
          color="red"
        />
      </div>
    </div>
  );
};

export default TodoItem;
