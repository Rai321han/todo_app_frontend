import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

export default function TodoController() {
  const { handleChangeFilter, filters } = useContext(TodoContext);
  const status = filters.status;

  return (
    <div className="p-5 sticky w-50 top-0 bg-gray-100/50 border-r border-r-gray-100/80 h-[calc(100vh)]">
      <p className="controller_text">Filters</p>
      <div className="flex h-full flex-col">
        <div className="controller_buttons_container">
          <button
            className={`px-3 py-2 rounded-md ${
              status === "" ? "bg-amber-200" : "bg-gray-200"
            }`}
            onClick={() => handleChangeFilter("status", "")}
          >
            All
          </button>
          <button
            className={`px-3 py-2 rounded-md ${
              status === "completed" ? "bg-green-200" : "bg-gray-200"
            }`}
            onClick={() => handleChangeFilter("status", "completed")}
          >
            Completed
          </button>
          <button
            className={`px-3 py-2 rounded-md ${
              status === "pending" ? "bg-orange-200" : "bg-gray-200"
            }`}
            onClick={() => handleChangeFilter("status", "pending")}
          >
            Pending
          </button>
        </div>
      </div>
    </div>
  );
}
