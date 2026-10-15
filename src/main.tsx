import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

interface TaskItem {
  _id: string;
  description: string;
  completed: boolean;
}

function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  async function loadTasks() {
    const res = await fetch("/api/tasks");
    setTasks(await res.json());
  }

  const [description, setDescription] = useState("");

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

  async function handleChangeTask(_id: string, delta: Partial<TaskItem>) {
    await fetch(`/api/tasks/${_id}`, {
      method: "PUT",
      body: JSON.stringify(delta),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await loadTasks();
  }

  return (
    <>
      <h1>Task application</h1>

      <h2>New task</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <button>Save</button>
        </div>
      </form>

      <h2>List tasks</h2>
      {tasks.map((t) => (
        <li key={t._id}>
          <label>
            <input
              type={"checkbox"}
              checked={t.completed}
              onChange={(e) =>
                handleChangeTask(t._id, { completed: e.target.checked })
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
