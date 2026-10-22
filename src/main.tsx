import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import type { TaskItem } from "./taskItem.js";

function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { description: "Fetch data from server", completed: false },
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
      {tasks.map(({ description, completed }) => (
        <li>
          <input type={"checkbox"} checked={completed} /> {description}
        </li>
      ))}
    </>
  );
}

createRoot(document.getElementById("root")!).render(<Application />);
