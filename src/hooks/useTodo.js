
import api from "../api/axios";

export default function useTodo() {
  const API_URL = import.meta.env.VITE_API_URL;

  const getAllTodos = async () => {
    try {
      const response = await api.get("/todos");
      return response.data;
    } catch (error) {
      console.error("Error fetching todos:", error);
      return [];
    }
  };

  return {
    getAllTodos,
  };
}
