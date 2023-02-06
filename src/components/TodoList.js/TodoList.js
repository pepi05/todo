import React from "react";
import TodoItem from "../TodoItem/TodoItem";

const TodoList = ({ todos, onEditClick, completeTodo, deleteTodo }) => {
  return (
    <div>
      {todos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEditClick={onEditClick}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
