import Badge from "./Badge";

export default function Todo({ todoData }) {
  return (
    <div className="todo_container">
      <div className="todo_title">{todoData.title}</div>
      <div className="todo_description">{todoData.description}</div>
      {
        // Render the status of the todo here
        todoData.completed ? (
          <Badge type="completed">Completed</Badge>
        ) : (
          <Badge type="pending">Pending</Badge>
        )
      }
    </div>
  );
}
