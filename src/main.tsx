import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import type { TaskItem } from "./taskItem.js";

function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  async function loadTasks() {
    const res = await fetch("/api/tasks");
    setTasks(await res.json());
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <h1>Task applications</h1>

      <h2>New task</h2>

      <form>
        <div>
          <label>
            Description: <input type="text" />
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
