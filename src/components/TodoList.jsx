import { useCallback, useContext, useEffect, useState } from "react";
import useTodo from "../hooks/useTodo";
import Todo from "./Todo";
import Pagination from "./Pagination";
import { TodoContext } from "../context/TodoContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCirclePlus } from "react-icons/fa6";
import Modal from "./Modal";

export default function TodoList() {
  const { getAllTodos, createTodo } = useTodo();
  const [todos, setTodos] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const { filters } = useContext(TodoContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [todoData, setTodoData] = useState({
    title: "",
    description: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setTodoData((prev) => ({ ...prev, [name]: value }));
  }

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

  const handleCreateTodo = async () => {
    if (!todoData.title.trim()) {
      alert("Title cannot be empty.");
      return;
    }

    if (!todoData.description.trim()) {
      alert("Description cannot be empty.");
      return;
    }

    const newTodo = {
      title: todoData.title,
      description: todoData.description,
      is_completed: false,
    };

    const created = await createTodo(newTodo);
    if (created) {
      refreshTodos();
    }
    return created;
  };

  return (
    <div className="w-full">
      <div>
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

        {!isLoading && !fetchError && (
          <>
            <div className="controller_buttons_container mt-5 w-fit mx-auto">
              <button
                onClick={() => setModalOpen(true)}
                className="cursor-pointer px-3 py-2 rounded-md hover:text-green-500 hover:underline underline-offset-2"
              >
                <div className="flex flex-row gap-2 items-center justify-center">
                  <p>Add Todo</p>
                  <FaCirclePlus className="fill-green-500" />
                </div>
              </button>
            </div>
            <div className="flex flex-row flex-wrap gap-2">
              {todos.map((todo) => (
                <Todo key={todo.id} todoData={todo} onChanged={refreshTodos} />
              ))}
            </div>
          </>
        )}
      </div>

      {isModalOpen && (
        <Modal>
          <div className="bg-white p-5 rounded-md max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Add Todo</h2>
            {/* Form fields for title, description, etc. */}
            <form>
              {/* Example input field */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={todoData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={todoData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
            </form>
            <div className="flex flex-row gap-2">
              <button
                className="mt-4 px-4 cursor-pointer py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                onClick={async () => {
                  const created = await handleCreateTodo();
                  if (created) setModalOpen(false);
                }}
              >
                Add Todo
              </button>
              <button
                className="mt-4 px-4 py-2 cursor-pointer border border-gray-300 text-gray-700 rounded-md hover:bg-gray-200"
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
      />
    </div>
  );
}
