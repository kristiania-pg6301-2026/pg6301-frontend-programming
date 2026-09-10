import { createRoot } from "react-dom/client";
import { useState } from "react";
import { TaskList } from "./taskList.tsx";
import { NewTaskForm } from "./newTaskForm";

function Application() {
  const [tasks, setTasks] = useState([
    { description: "create npm app" },
    { description: "create react app" },
  ]);

  function handleNewTask(task) {
    setTasks((old) => [...old, task]);
  }

  return (
    <>
      <h1>Tasks</h1>
      <TaskList tasks={tasks} />
      <h2>Create new task</h2>
      <NewTaskForm onNewTask={handleNewTask} />
    </>
  );
}

createRoot(document.getElementById("app")).render(<Application />);
