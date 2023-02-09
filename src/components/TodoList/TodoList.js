import React from "react";
import { useTodoContext } from "../../context/todoContext";
import TodoItem from "../TodoItem/TodoItem";

const TodoList = () => {
  const { filteredTodoList, onEditClick, completeTodo, deleteTodo } =
    useTodoContext();
  return (
    <div>
      {filteredTodoList.map((todo) => {
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
