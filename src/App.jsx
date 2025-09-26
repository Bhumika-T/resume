import { useState, useEffect } from "react";
import TodoItem from "./components/TodoItem";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // Load tasks from backend when app starts
  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error(err));
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input, completed: false }),
    });

    const newTask = await res.json();
    setTasks([...tasks, newTask]);
    setInput("");
  };

  const toggleTask = async (id, completed) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });

    const updatedTask = await res.json();
    setTasks(tasks.map(t => t._id === id ? updatedTask : t));
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter(t => t._id !== id));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">To-Do List (MongoDB)</h1>

      <form onSubmit={addTask} className="flex mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
          className="border p-2 flex-grow"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 ml-2">
          Add
        </button>
      </form>

      <ul>
        {tasks.length === 0 && <li>No tasks yet!</li>}
        {tasks.map((task) => (
          <TodoItem
            key={task._id}
            task={task}
            onToggle={() => toggleTask(task._id, task.completed)}
            onDelete={() => deleteTask(task._id)}
          />
        ))}
      </ul>
    </div>
  );
}
