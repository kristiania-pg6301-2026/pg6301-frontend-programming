import React from "react";
import { createRoot } from "react-dom/client";

function Application() {
  const tasks = [
    { name: "Create new project", completed: true },
    { name: "Add typescript and husky", completed: true },
    { name: "Show tasks", completed: true },
    { name: "Create new task", completed: false },
    { name: "Fetch tasks from server", completed: false },
    { name: "Create task on server", completed: false },
    { name: "Deploy application to Clever Cloud", completed: false },
    { name: "Update task on server", completed: false },
  ];

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
    </>
  );
}

createRoot(document.getElementById("app")!).render(<Application />);
