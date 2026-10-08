import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import type { TaskItem } from "./taskItem.js";

import "./application.css";

function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string>();

  const [description, setDescription] = useState("");

  async function loadTasks() {
    setUpdating(true);
    const res = await fetch("/api/tasks", { method: "GET" });
    if (res.ok) {
      setTasks(await res.json());
    } else {
      setError(`Failed to load ${res.url}: ${res.status} ${res.statusText}`);
    }
    setUpdating(false);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleSubmit(event: React.SubmitEvent) {
    setUpdating(true);
    event.preventDefault();
    await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ description, completed: false }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await loadTasks();
  }

  async function handleUpdate(id: number, delta: Partial<TaskItem>) {
    setUpdating(true);
    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(delta),
      headers: { "Content-Type": "application/json" },
    });
    await loadTasks();
  }

  return (
    <>
      <h1>Task Manager</h1>
      <h2>Create new task</h2>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={updating}>
          <div>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <button>Add task</button>
          </div>
        </fieldset>
      </form>
      <h2>My Tasks</h2>
      <div className={"task-component"}>
        {updating && <div className={"progress-spinner"}>Loading</div>}
        {error && <div className={"error"}>⚠️ {error}</div>}
        {tasks.map((t) => (
          <li key={t.id}>
            <label>
              <input
                type={"checkbox"}
                checked={t.completed}
                disabled={updating}
                onChange={(e) =>
                  handleUpdate(t.id, { completed: e.target.checked })
                }
              />
              {t.description}
            </label>
          </li>
        ))}
      </div>
    </>
  );
}

createRoot(document.getElementById("root")!).render(<Application />);
