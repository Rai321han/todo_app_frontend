import { useEffect, useState } from "react";
import useTodo from "../hooks/useTodo";
import Todo from "./Todo";

export default function TodoList() {
  const { getAllTodos } = useTodo();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getAllTodos();
      setTodos(todos.todos);
    };

    fetchTodos();
  }, []);

  return (
    <div className="todo-list-container">
      {
        // Render the list of todos here
        todos.map((todo) => (
          <Todo key={todo.id} todoData={todo} />
        ))
      }
    </div>
  );
}
