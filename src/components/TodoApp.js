import React, { useState, useEffect } from "react";
import { TodoList } from "../components/TodoList";
import { AddTodo } from "../components/AddTodo";
import { Filter } from "./AddFilter";

export const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (task) => {
    const newTodo = { id: Date.now(), task, completed: false };
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <AddTodo addTodo={addTodo} />
      <Filter setFilter={setFilter} />
      <TodoList
        todos={filteredTodos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />
    </div>
  );
};

// export default TodoApp;
