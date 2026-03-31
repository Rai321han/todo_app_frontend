import { useCallback, useMemo } from "react";
import api from "../api/axios";

export default function useTodo() {
  const getAllTodos = useCallback(async (filters = {}) => {
    try {
      const response = await api.get("/todos", { params: filters });
      return response.data;
    } catch (error) {
      console.error("Error fetching todos:", error);
      return {
        todos: [],
        current_page: 1,
        total_pages: 1,
        error: error.message,
      };
    }
  }, []);

  const createTodo = useCallback(async (data) => {
    try {
      const response = await api.post("/todos", data);
      return response.data;
    } catch (error) {
      console.error("Error creating todo:", error);
      return null;
    }
  }, []);

  const updateTodo = useCallback(async (id, data) => {
    try {
      const response = await api.put(`/todos/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating todo:", error);
      return null;
    }
  }, []);

  const deleteTodo = useCallback(async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      return true;
    } catch (error) {
      console.error("Error deleting todo:", error);
      return false;
    }
  }, []);

  return useMemo(
    () => ({
      getAllTodos,
      updateTodo,
      deleteTodo,
      createTodo,
    }),
    [getAllTodos, updateTodo, deleteTodo]
  );
}
