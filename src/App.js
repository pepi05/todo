import { useEffect, useRef, useState } from "react";
import "./app.css";
import SelectInput from "./components/SelectInput/SelectInput";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoList from "./components/TodoList/TodoList";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [editId, setEditId] = useState(null);
  const [selectedValue, setSelectedValue] = useState("All Todos");
  const [dateSort, setDateSort] = useState("desc");
  const inputRef = useRef();

  const filterOptions = [
    { value: "Active", name: "Active" },
    { value: "Completed", name: "Completed" },
  ];
  const sortOptions = [
    { value: "asc", name: "Earliest" },
    { value: "A-Z", name: "A-Z" },
    { value: "Z-A", name: "Z-A" },
  ];

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

  const filteredTodoList = todos
    .filter((todo) => {
      if (selectedValue === "Active") {
        return todo.active;
      }
      if (selectedValue === "Completed") {
        return !todo.active;
      }
      return todo;
    })
    .sort((a, b) => {
      if (dateSort === "A-Z") {
        return a.name.localeCompare(b.name);
      } else if (dateSort === "Z-A") {
        return b.name.localeCompare(a.name);
      } else if (dateSort === "asc") {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });

  const onDateSort = (e) => {
    setDateSort(e.target.value);
  };

  useEffect(() => {
    if (isEditClicked) {
      inputRef.current.focus();
    }
  }, [isEditClicked, editId]);

  return (
    <div className="App">
      <h1 className="appTitle">Petar Todo</h1>
      <div className="formAndSelectContainer">
        <div className="todoFormContainer">
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

        <div className="selectContainer">
          <SelectInput
            onChange={onSelectChange}
            id="filterTodos"
            defaultValue="All Todos"
            defaultName="All Todos"
            options={filterOptions}
          />
        </div>

        <div className="selectContainer">
          <SelectInput
            onChange={onDateSort}
            id="sortTodos"
            defaultValue="desc"
            defaultName="Latest"
            options={sortOptions}
          />
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
