import { createContext, useContext, useRef, useState } from "react";

export const TodoContext = createContext();

export const TodoProvider = (props) => {
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

  const contextValue = {
    inputValue,
    todos,
    isEditClicked,
    editId,
    selectedValue,
    dateSort,
    inputRef,
    onInputChange,
    addTodo,
    deleteTodo,
    completeTodo,
    onEditClick,
    updateTodo,
    cancelUpdate,
    onSelectChange,
    onDateSort,
    filteredTodoList,
    filterOptions,
    sortOptions,
  };

  return (
    <TodoContext.Provider value={contextValue}>
      {props.children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodoContext);
