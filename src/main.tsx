import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import type { TaskItem } from "./taskItem.js";

function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { description: "fetch items from server", completed: false },
  ]);

  async function loadTasks() {
    const res = await fetch("/api/tasks");
    setTasks(await res.json());
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((t) => (
          <li>
            <input type={"checkbox"} checked={t.completed} /> {t.description}
          </li>
        ))}
      </ul>
    </>
  );
}

createRoot(document.getElementById("root")!).render(<Application />);
