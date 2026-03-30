import TodoController from "../components/TodoController";
import TodoList from "../components/TodoList";
import TodoProvider from "../context/TodoContext"

export default function Dashboard() {
  return (
    <div className="flex flex-1 flex-row gap-5">
      <TodoProvider>
      <div>
        <TodoController />
      </div>
      <div className="w-full">
        <TodoList />
      </div>
      </TodoProvider>
    </div>
  );
}
