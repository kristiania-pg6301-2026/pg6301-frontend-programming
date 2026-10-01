import React, { useState } from "react";
import { createRoot } from "react-dom/client";

function Application() {
  const [tasks, setTasks] = useState([
    { description: "Create react app", completed: true },
    { description: "Deploy to Clever Cloud", completed: true },
    { description: "Show tasks on client", completed: true },
    { description: "Show tasks from server", completed: false },
    { description: "Create tasks on server", completed: false },
  ]);

  return (
    <>
      <h1>My Tasks</h1>
      {tasks.map((t) => (
        <li>
          <input type={"checkbox"} checked={t.completed} />
          {t.description}
        </li>
      ))}
    </>
  );
}

createRoot(document.getElementById("root")!).render(<Application />);
