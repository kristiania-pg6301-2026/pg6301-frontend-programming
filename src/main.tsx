import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import type { TaskItem } from "./taskItem.js";

function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  async function loadTasks() {
    const res = await fetch("/api/tasks");
    setTasks(await res.json());
  }

  const [description, setDescription] = useState("");
  async function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault();
    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description }),
    });
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <h1>Task applications</h1>

      <h2>New task</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Description:{" "}
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button>Save</button>
        </div>
      </form>

      <h2>My tasks</h2>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <input type={"checkbox"} checked={t.completed} />
            {t.description}
          </li>
        ))}
      </ul>
    </>
  );
}

createRoot(document.getElementById("root")!).render(<Application />);
