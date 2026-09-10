import { createRoot } from "react-dom/client";
import { useState } from "react";
import { TaskList } from "./taskList";

function Application() {
  const [tasks, setTasks] = useState([
    { description: "create npm app" },
    { description: "create react app" },
  ]);

  return (
    <>
      <h1>Tasks</h1>
      <TaskList tasks={tasks} />
    </>
  );
}

createRoot(document.getElementById("app")).render(<Application />);
