import { createRoot } from "react-dom/client";
import { useState } from "react";
import { TaskList } from "./taskList.js";
import { NewTaskForm } from "./newTaskForm.js";
import type { TaskItem } from "./taskItem.js";

function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { description: "create npm app" },
    { description: "create react app" },
  ]);

  function handleNewTask(task: TaskItem) {
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

createRoot(document.getElementById("app")!).render(<Application />);
