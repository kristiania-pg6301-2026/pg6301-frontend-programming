import { createRoot } from "react-dom/client";
import { useState } from "react";

function Application() {
  const [newTask, setNewTask] = useState("");

  return (
    <>
      <h1>My tasks</h1>

      <h2>Create new tasks</h2>

      <form>
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
    </>
  );
}

createRoot(document.getElementById("app")).render(<Application />);
