import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import type { TaskItem } from "./taskItem.js";

import "./application.css";

interface ErrorFromServer {
  error: string;
}

function Application() {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState<string>();
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | ErrorFromServer>();
  const [updating, setUpdating] = useState(false);
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  const [description, setDescription] = useState("");

  async function loadTasks() {
    setLoading(true);
    const res = await fetch("/api/tasks");
    if (res.ok) {
      setTasks(await res.json());
      setLoadingError(undefined);
    } else {
      setLoadingError(`Error on load ${res.status} ${res.statusText}`);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function submitTask() {
    setCreating(true);
    var res = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ description, completed: false }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setCreating(false);
    if (res.ok) {
      (document.activeElement as HTMLElement)?.blur();
      await loadTasks();
    } else if (res.status >= 400 && res.status < 500) {
      setCreateError(await res.json());
    } else {
      setCreateError(`Error on create ${res.status} ${res.statusText}`);
    }
  }

  async function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault();
    await submitTask();
  }

  async function handleUpdate(id: number, delta: Partial<TaskItem>) {
    setUpdating(true);
    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(delta),
      headers: { "Content-Type": "application/json" },
    });
    setUpdating(false);
    await loadTasks();
  }

  return (
    <>
      <h1>Task Manager</h1>
      <h2>Create new task</h2>
      <div
        className={editing || creating ? "create-form editing" : "create-form"}
      >
        <div className={"overlay"} />
        <form
          onSubmit={handleSubmit}
          onFocus={() => setEditing(true)}
          onBlur={() => setEditing(false)}
        >
          <div className={"input-with-spinner"}>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {creating && <span className={"progress"} />}
          </div>
          {createError && (
            <div className={"error"}>
              ⚠️{" "}
              {typeof createError === "object" ? (
                <>{createError.error}</>
              ) : (
                <>
                  {createError} <button onClick={submitTask}>Retry</button>
                </>
              )}
            </div>
          )}
          <div>
            <button>Add task</button>
          </div>
        </form>
      </div>
      <h2>My Tasks</h2>
      {loading && <div className={"progress"}>Loading</div>}
      {loadingError && (
        <div className={"error"}>
          ⚠️ {loadingError} <button onClick={loadTasks}>Retry</button>
        </div>
      )}
      {loading ||
        !!loadingError ||
        tasks.map((t) => (
          <li key={t.id}>
            <label>
              <input
                type={"checkbox"}
                disabled={updating}
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
