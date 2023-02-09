import { useEffect } from "react";
import SelectInput from "./components/SelectInput/SelectInput";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoList from "./components/TodoList/TodoList";
import { useTodoContext } from "./context/todoContext";
import "./app.css";

const App = () => {
  const {
    isEditClicked,
    editId,
    inputRef,
    onSelectChange,
    onDateSort,
    filterOptions,
    sortOptions,
  } = useTodoContext();

  useEffect(() => {
    if (isEditClicked) {
      inputRef.current.focus();
    }
  }, [isEditClicked, editId, inputRef]);

  return (
    <div className="App">
      <h1 className="appTitle">Petar Todo</h1>
      <div className="formAndSelectContainer">
        <div className="todoFormContainer">
          <TodoForm />
        </div>

        <div className="selectContainer">
          <SelectInput
            onChange={onSelectChange}
            defaultValue="All Todos"
            defaultName="All Todos"
            options={filterOptions}
          />
        </div>

        <div className="selectContainer">
          <SelectInput
            onChange={onDateSort}
            defaultValue="desc"
            defaultName="Latest"
            options={sortOptions}
          />
        </div>
      </div>

      <TodoList />
    </div>
  );
};

export default App;
