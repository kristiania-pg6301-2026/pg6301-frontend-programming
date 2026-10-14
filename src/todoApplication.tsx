import React, { useEffect, useState } from "react";
import type { TaskItem } from "./taskItem.js";

export function TodoApplication() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [description, setDescription] = useState("");
  async function loadTasks() {
    const res = await fetch("/api/tasks");
    setTasks(await res.json());
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault();
    await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ description, completed: false }),
      headers: { "Content-Type": "application/json " },
    });
    await loadTasks();
  }

  async function handleTaskUpdate(_id: string, delta: Partial<TaskItem>) {
    await fetch(`/api/tasks/${_id}`, {
      method: "PUT",
      body: JSON.stringify(delta),
      headers: { "Content-Type": "application/json" },
    });
    await loadTasks();
  }

  return (
    <>
      <h2>New task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type={"text"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <button>Save task</button>
        </div>
      </form>
      <h2>My tasks</h2>
      <ul>
        {tasks.map((t) => (
          <li key={t._id}>
            <label>
              <input
                type={"checkbox"}
                checked={t.completed}
                onChange={(e) =>
                  handleTaskUpdate(t._id, { completed: e.target.checked })
                }
              />{" "}
              {t.description}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}
