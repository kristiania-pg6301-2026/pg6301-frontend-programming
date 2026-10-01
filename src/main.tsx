import React, { useState } from "react";
import { createRoot } from "react-dom/client";

function Application() {
  const [tasks, setTasks] = useState([
    { description: "Create react app", completed: true },
    { description: "Deploy to Clever Cloud", completed: true },
    { description: "Show tasks on client", completed: true },
    { description: "Create tasks on client", completed: true },
    { description: "Show tasks from server", completed: false },
    { description: "Create tasks on server", completed: false },
  ]);

  const [description, setDescription] = useState("");

  function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault();
    setTasks((old) => [...old, { description, completed: false }]);
  }

  return (
    <>
      <h1>Task Manager</h1>
      <h2>Create new task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <button>Add task</button>
        </div>
      </form>
      <h2>My Tasks</h2>
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
