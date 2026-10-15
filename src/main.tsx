import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

interface TaskItem {
  id: number;
  description: string;
  completed: boolean;
}

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
      <h1>Task application</h1>
      <h2>List tasks</h2>
      {tasks.map((t) => (
        <li>{t.description}</li>
      ))}
    </>
  );
}

createRoot(document.getElementById("root")!).render(<Application />);
