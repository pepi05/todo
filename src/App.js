import { useState } from "react";
import { AiOutlineDelete, AiOutlineCheck, AiOutlineEdit } from "react-icons/ai";
import "./app.css";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addTodo = (todo) => {
    const newTodo = {
      id: Math.floor(Math.random() * 1000),
      name: todo,
      date: new Date().toLocaleString(),
      active: true,
    };

    if (todo.length <= 2) return;
    setTodos((prevState) => [...prevState, newTodo]);
    setInputValue("");
  };

  const deleteTodo = (todoId) => {
    const filteredTodo = todos.filter((todo) => todo.id !== todoId);
    setTodos(filteredTodo);
  };

  const completeTodo = (todoId) => {
    const completedTodo = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          active: !todo.active,
        };
      }
      return todo;
    });
    setTodos(completedTodo);
  };

  return (
    <div className="App">
      <h1 className="appTitle">Petar Todo</h1>
      <div className="formContainer">
        <input
          className="formInput"
          type="text"
          id="text"
          onChange={onInputChange}
          value={inputValue}
          placeholder="Enter Todo"
        />
        <button className="addButton" onClick={() => addTodo(inputValue)}>
          Add
        </button>
      </div>

      {todos.map((todo) => {
        return (
          <div
            key={todo.id}
            className={`${
              !todo.active && "todoCompletedContainer"
            } todoContainer`}
          >
            <h2 className={`${!todo.active && "completedTodo"} todoName`}>
              {todo.name}
            </h2>
            <div className="todoIconsContainer">
              <AiOutlineEdit className="icon" size={20} />
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
      })}
    </div>
  );
};

export default App;
