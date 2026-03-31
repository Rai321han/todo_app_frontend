import { useCallback, useContext, useEffect, useState } from "react";
import useTodo from "../hooks/useTodo";
import Todo from "./Todo";
import Pagination from "./Pagination";
import { TodoContext } from "../context/TodoContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function TodoList() {
  const { getAllTodos } = useTodo();
  const [todos, setTodos] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const { filters } = useContext(TodoContext);

  const refreshTodos = useCallback(() => {
    setReloadKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchTodos = async () => {
      setIsLoading(true);
      setFetchError(null);

      const response = await getAllTodos(filters);

      if (!isMounted) {
        return;
      }

      setTodos(Array.isArray(response.todos) ? response.todos : []);
      setPagination({
        currentPage: response.current_page || 1,
        totalPages: response.total_pages || 1,
      });

      if (response.error) {
        setFetchError(response.error);
      }

      setIsLoading(false);
    };

    fetchTodos();

    return () => {
      isMounted = false;
    };
  }, [filters, getAllTodos, reloadKey]);

  return (
    <div className="w-full">
      <div className="flex flex-row flex-wrap gap-2">
        {isLoading && (
          <div className="text-gray-500 h-[90vh] w-full flex items-center justify-center">
            <div className="h-screen grid place-items-center">
              <AiOutlineLoading3Quarters className="animate-spin text-4xl text-green-300" />
            </div>
          </div>
        )}

        {!isLoading && fetchError && (
          <div className="text-red-500 h-[90vh] w-full flex items-center justify-center">
            <div>Failed to load todos. Please try again.</div>
          </div>
        )}

        {!isLoading && !fetchError && todos.length === 0 && (
          <div className="text-gray-500 h-[90vh] w-full flex items-center justify-center">
            <div>No todos found.</div>
          </div>
        )}

        {!isLoading &&
          !fetchError &&
          todos.map((todo) => (
            <Todo key={todo.id} todoData={todo} onChanged={refreshTodos} />
          ))}
      </div>

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
      />
    </div>
  );
}
