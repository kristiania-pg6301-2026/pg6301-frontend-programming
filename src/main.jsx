import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";

function Application() {
  const [tasks, setTasks] = useState([]);

  async function fetchData() {
    const res = await fetch("/api/tasks");
    if (res.ok) {
      const tasks = await res.json();
      setTasks(tasks);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

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
