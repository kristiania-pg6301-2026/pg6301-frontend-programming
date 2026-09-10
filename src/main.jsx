import { createRoot } from "react-dom/client";
import { useState } from "react";
import TaskList from "./TaskList.tsx";
import NewTaskForm from "./NewTaskForm.tsx";

function Application() {
  const [tasks, setTasks] = useState([
    { description: "create npm project" },
    { description: "create react code" },
  ]);

  function handleNewTask(task) {
    setTasks((old) => [task, ...old]);
  }

  return (
    <>
      <h1>My Tasks</h1>
      <TaskList tasks={tasks} />
      <h2>Create new task</h2>
      <NewTaskForm onNewTask={handleNewTask} />
    </>
  );
}

createRoot(document.getElementById("app")).render(<Application />);
