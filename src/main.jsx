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

  async function handleSubmit(event) {
    event.preventDefault();
    await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ title: newTask }),
    });
    await fetchData();
  }

  async function handleTaskChecked(id, checked) {
    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ checked }),
    });
    await fetchData();
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
            <input
              type={"checkbox"}
              checked={t.completed}
              onChange={(e) => handleTaskChecked(t.id, e.target.checked)}
            />
            {t.title}
          </li>
        ))}
      </ul>
    </>
  );
}

createRoot(document.getElementById("app")).render(<Application />);
