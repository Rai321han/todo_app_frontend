import { useContext, useEffect, useState, useRef } from "react";
import useTodo from "../hooks/useTodo";
import Todo from "./Todo";
import Pagination from "./Pagination";
import { todocontext } from "../context/TodoContext";

export default function TodoList() {
  const { getAllTodos } = useTodo();
  const [todos, setTodos] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [reloadKey, setReloadKey] = useState(0);
  const { filters, handleChangeFilter } = useContext(todocontext);
  const prevStatusRef = useRef(filters.status);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await getAllTodos(filters);
      setTodos(response.todos || []);
      setPagination({
        currentPage: response.current_page || 1,
        totalPages: response.total_pages || 1
      });
    };

    fetchTodos();
  }, [filters, reloadKey]);

  // Reset to page 1 when status filter changes
  useEffect(() => {
    if (filters.status !== prevStatusRef.current) {
      prevStatusRef.current = filters.status;
      if (filters.page !== 1) {
        handleChangeFilter("page", 1);
      }
    }
  }, [filters.status, filters.page, handleChangeFilter]);

  const refreshTodos = () => {
    setReloadKey((prev) => prev + 1);
  };

  return (
    <div className="w-full">
      <div className="flex flex-row flex-wrap gap-2">
        {
          todos.length === 0 && (
            <div className="text-gray-500 h-[90vh] w-full flex items-center justify-center">
              <div>
                No todos found.
              </div>
            </div>
          )
        }
        {
          todos.map((todo) => (
            <Todo key={todo.id} todoData={todo} onChanged={refreshTodos} />
          ))
        }
      </div>
      <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
    </div>
  );
}
