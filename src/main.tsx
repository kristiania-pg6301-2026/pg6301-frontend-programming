import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import type { TaskItem } from "./taskItem.js";

function Application() {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  const [description, setDescription] = useState("");

  async function loadTasks() {
    setLoading(true);
    const res = await fetch("/api/tasks");
    setTasks(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleSubmit(event: React.SubmitEvent) {
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
      {loading && <div className={"progress"}>Loading</div>}
      {loading ||
        tasks.map((t) => (
          <li key={t.id}>
            <label>
              <input
                type={"checkbox"}
                checked={t.completed}
                onChange={(e) =>
                  handleUpdate(t.id, { completed: e.target.checked })
                }
              />
              {t.description}
            </label>
          </li>
        ))}
    </>
  );
}

createRoot(document.getElementById("root")!).render(<Application />);
