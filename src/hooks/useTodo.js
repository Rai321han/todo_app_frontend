
import api from "../api/axios";

export default function useTodo() {

  const getAllTodos = async (filters) => {
    try {
      const response = await api.get("/todos", { params: filters });
      return response.data;
    } catch (error) {
      console.error("Error fetching todos:", error);
      return [];
    }
  };

  const updateTodo = async (id, data) => {
    try {
      const response = await api.put(`/todos/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating todo:", error);
      return null;
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      return true;
    } catch (error) {
      console.error("Error deleting todo:", error);
      return false;
    }
  };

  return {
    getAllTodos,
    updateTodo,
    deleteTodo
  };
}
