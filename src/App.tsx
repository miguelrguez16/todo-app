import React, { useState } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Todos } from "./components/Todos";
import { TODO_FILTERS } from "./consts";
import {
  FilterValue,
  TodoTitle,
  type TodoId,
  type Todo as TodoType,
} from "./types";
import { mockedTodos } from "./utils/mocks";

const App: React.FC = () => {
  const [todos, setTodos] = useState(mockedTodos);
  const [filterSelected, setFilterSelected] = useState<FilterValue>(
    TODO_FILTERS.ALL
  );

  const handleRemove = ({ id }: TodoId) =>
    setTodos(todos.filter((todo) => todo.id !== id));

  const onToggleComplete = ({
    id,
    completed,
  }: Pick<TodoType, "id" | "completed">): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleFilterChange = (filter: FilterValue) => setFilterSelected(filter);
  const handleRemoveAllCompletedTodos = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  const filteredTodo = todos.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed;
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed;
    return todo;
  });

  const completedTodos = todos.filter((todo) => todo.completed).length;
  const noCompletedTodos = todos.length - completedTodos;

  const handleAddTodo = ({ title }: TodoTitle) => {
    const newTodo = {
      id: crypto.randomUUID(),
      title: title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  return (
    <div className="todoapp">
      <Header onAddTodo={handleAddTodo} />
      <Todos
        onRemove={handleRemove}
        onToggleComplete={onToggleComplete}
        todos={filteredTodo}
      />
      <Footer
        activeAccount={noCompletedTodos}
        completedAccount={completedTodos}
        filterSelected={filterSelected}
        handleFilterChange={handleFilterChange}
        onClearCompleted={handleRemoveAllCompletedTodos}
      />
    </div>
  );
};
export default App;
