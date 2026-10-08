import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import type { TaskItem } from "./taskItem.js";

import "./application.css";

function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | Error>();
  const [saveError, setSaveError] = useState<string | Error>();

  const [description, setDescription] = useState("");

  async function loadTasks() {
    setUpdating(true);
    try {
      const res = await fetch("/api/tasks", { method: "GET" });
      if (res.ok) {
        setTasks(await res.json());
      } else {
        setError(`Failed to load ${res.url}: ${res.status} ${res.statusText}`);
      }
    } catch (error) {
      setTasks([]);
      setError(error as Error);
    } finally {
      setUpdating(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleSubmit(event: React.SubmitEvent) {
    setUpdating(true);
    setSaveError(undefined);
    event.preventDefault();
    const res = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ description, completed: false }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const error = await res.json();
      setSaveError(error.error);
      setUpdating(false);
      return;
    }
    await loadTasks();
  }

  async function handleUpdate(id: number, delta: Partial<TaskItem>) {
    setUpdating(true);
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify(delta),
        headers: { "Content-Type": "application/json" },
      });
    } finally {
      await loadTasks();
    }
  }

  return (
    <>
      <h1>Task Manager</h1>
      <h2>Create new task</h2>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={updating}>
          {saveError && (
            <div className={"error"}>⚠️ {saveError.toString()}</div>
          )}
          <div>
            <input
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <button disabled={!description}>Add task</button>
          </div>
        </fieldset>
      </form>
      <h2>My Tasks</h2>
      <div className={"task-component"}>
        {updating && <div className={"progress-spinner"}>Loading</div>}
        {error && <div className={"error"}>⚠️ {error.toString()}</div>}
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
