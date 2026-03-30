import TodoController from "../components/TodoController";
import TodoList from "../components/TodoList";

export default function Dashboard() {
  return (
    <div className="container">
      <div className="side-bar">
        <TodoController />
      </div>
      <div className="main-content">
        <TodoList />
      </div>
    </div>
  );
}
