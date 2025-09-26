export default function TodoItem({ task, onToggle, onDelete }) {
  return (
    <li className="flex justify-between items-center border-b py-2">
      <span
        onClick={onToggle}
        className={task.completed ? "line-through cursor-pointer" : "cursor-pointer"}
      >
        {task.text}
      </span>
      <button onClick={onDelete} className="text-red-500">Delete</button>
    </li>
  );
}
