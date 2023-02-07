import { useEffect, useRef, useState } from "react";
import "./app.css";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoList from "./components/TodoList.js/TodoList";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [editId, setEditId] = useState(null);
  const [selectedValue, setSelectedValue] = useState("All Todos");
  const inputRef = useRef();

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

  const onSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const filteredTodoList = todos.filter((todo) => {
    if (selectedValue === "Active") {
      return todo.active;
    }
    if (selectedValue === "Completed") {
      return !todo.active;
    }
    return todo;
  });

  useEffect(() => {
    if (isEditClicked) {
      inputRef.current.focus();
    }
  }, [isEditClicked]);

  return (
    <div className="App">
      <h1 className="appTitle">Petar Todo</h1>
      <div
        style={{
          display: "flex",
          width: "50%",
          margin: "0 auto",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "60%" }}>
          <TodoForm
            inputRef={inputRef}
            inputValue={inputValue}
            onInputChange={onInputChange}
            isEditClicked={isEditClicked}
            addTodo={addTodo}
            cancelUpdate={cancelUpdate}
            updateTodo={updateTodo}
          />
        </div>

        <div style={{ width: "30%" }}>
          <select onChange={onSelectChange} id="todos">
            <option defaultValue>All Todos</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <TodoList
        todos={filteredTodoList}
        onEditClick={onEditClick}
        completeTodo={completeTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
};

export default App;
