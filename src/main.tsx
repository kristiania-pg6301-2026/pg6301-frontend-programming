import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import type { TaskItem } from "./taskItem.js";

function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  const [description, setDescription] = useState("");

  async function loadTasks() {
    const res = await fetch("/api/tasks");
    setTasks(await res.json());
  }

  useEffect(() => {
    loadTasks();
  }, []);

  function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault();
    setTasks((old) => [...old, { description, completed: false }]);
  }

  return (
    <>
      <h1>Task Manager</h1>
      <h2>Create new task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <button>Add task</button>
        </div>
      </form>
      <h2>My Tasks</h2>
      {tasks.map((t) => (
        <li>
          <input type={"checkbox"} checked={t.completed} />
          {t.description}
        </li>
      ))}
    </>
  );
}

createRoot(document.getElementById("root")!).render(<Application />);
