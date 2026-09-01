import React, { useState, useEffect, type SubmitEvent } from "react";
import { createRoot } from "react-dom/client";

interface TaskItem {
  completed: boolean;
  name: string;
}

function Application() {
  const [taskName, setTaskName] = useState("The new task");
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  async function loadTasks() {
    const res = await fetch("/api/tasks");
    setTasks(await res.json());
  }

  useEffect(() => {
    loadTasks();
  }, []);

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    setTasks((old) => [
      ...old,
      {
        name: taskName,
        completed: false,
      },
    ]);
  }

  return (
    <>
      <h1>My tasks</h1>
      <ol>
        {tasks.map((t) => (
          <li>
            <input type={"checkbox"} checked={t.completed} />
            {t.name}
          </li>
        ))}
      </ol>
      <h2>Create new task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Task name:{" "}
          <input
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>
        <div>
          <button>Save {taskName}</button>
        </div>
      </form>
    </>
  );
}

createRoot(document.getElementById("app")!).render(<Application />);
