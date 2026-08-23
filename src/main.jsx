import { createRoot } from "react-dom/client";
import { useState } from "react";

function Application() {
  const [tasks, setTasks] = useState([
    { title: "Create client app", completed: true },
    { title: "Fetch from server", completed: false },
    { title: "Post to server", completed: false },
    { title: "Deploy to clever.cloud", completed: false },
  ]);

  const [newTask, setNewTask] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setTasks((old) => [...old, { title: newTask }]);
  }

  return (
    <>
      <h1>My tasks</h1>

      <h2>Create new tasks</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Task: </label>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
        </div>
        <div>
          <button>Save {newTask}</button>
        </div>
      </form>

      <h2>Existing tasks</h2>

      <ul>
        {tasks.map((t) => (
          <li>
            <input type={"checkbox"} checked={t.completed} />
            {t.title}
          </li>
        ))}
      </ul>
    </>
  );
}

createRoot(document.getElementById("app")).render(<Application />);
