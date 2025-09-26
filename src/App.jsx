import { useState, useEffect } from "react";
import TodoItem from "./components/TodoItem";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

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
    <div className="app-container">
      <div className="todo-card">
        <h1 className="todo-title">📌 My Stylish To-Do</h1>

        <form onSubmit={addTask} className="todo-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter new task..."
            className="todo-input"
          />
          <button type="submit" className="todo-add-btn">Add</button>
        </form>

        <div className="todo-list-container">
          {tasks.length === 0 && (
            <p className="no-tasks">No tasks yet. Add one above!</p>
          )}
          <ul className="todo-list">
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
      </div>
    </div>
  );
}
