import "../App.css";

export default function TodoItem({ task, onToggle, onDelete }) {
  return (
    <li className="todo-item">
      <span
        onClick={onToggle}
        className={`todo-text ${task.completed ? "completed" : ""}`}
      >
        {task.text}
      </span>
      <div className="todo-actions">
        <button
          onClick={onToggle}
          className={`todo-toggle-btn ${task.completed ? "done" : "pending"}`}
        >
          {task.completed ? "Undo" : "Done"}
        </button>
        <button onClick={onDelete} className="todo-delete-btn">
          Delete
        </button>
      </div>
    </li>
  );
}
