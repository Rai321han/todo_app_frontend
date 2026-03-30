export default function TodoController() {
  return (
    <div className="controller_container">
      <p className="controller_text">Filters</p>
      <div className="controller_buttons_container">
        <button className="controller_button">All</button>
        <button className="controller_button">Completed</button>
        <button className="controller_button">Pending</button>
      </div>
    </div>
  );
}
