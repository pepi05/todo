import { useEffect, useRef, useState } from "react";
import { AiOutlineDelete, AiOutlineCheck, AiOutlineEdit } from "react-icons/ai";
import "./app.css";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [editId, setEditId] = useState(null);
  const itemRef = useRef();

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

  const onEditClick = (todoText, todoId) => {
    setInputValue(todoText);
    setIsEditClicked(true);
    setEditId(todoId);
  };

  const updateTodo = () => {
    const updatedTodo = todos.map((todo) => {
      if (todo.id === editId && inputValue.length > 1) {
        return {
          ...todo,
          name: inputValue,
        };
      }
      return todo;
    });
    setTodos(updatedTodo);
    setInputValue("");
    setIsEditClicked(false);
  };

  const cancelUpdate = () => {
    setIsEditClicked(false);
    setInputValue("");
  };

  useEffect(() => {
    if (isEditClicked) {
      itemRef.current.focus();
    }
  }, [isEditClicked]);

  return (
    <div className="App">
      <h1 className="appTitle">Petar Todo</h1>
      <div className="formContainer">
        <input
          ref={itemRef}
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
      })}
    </div>
  );
};

export default App;
