import React, { useState, type SubmitEvent } from "react";
import { createRoot } from "react-dom/client";

function Application() {
  const [taskName, setTaskName] = useState("The new task");

  const [tasks, setTasks] = useState([
    { name: "Create new project", completed: true },
    { name: "Add typescript and husky", completed: true },
    { name: "Show tasks", completed: true },
    { name: "Create new task", completed: true },
    { name: "Fetch tasks from server", completed: false },
    { name: "Create task on server", completed: false },
    { name: "Deploy application to Clever Cloud", completed: false },
    { name: "Update task on server", completed: false },
  ]);

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
