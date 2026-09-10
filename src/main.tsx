import { createRoot } from "react-dom/client";
import { useState } from "react";
import type { TaskItem } from "./TaskItem.js";
import { HashRouter } from "react-router-dom";
import FrontPage from "./FrontPage.js";

function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { description: "Show current tasks", completed: true },
    { description: "Create new tasks", completed: true },
    { description: "Mark task as done", completed: true },
    { description: "Implement routing", completed: false },
    {
      description: "Update task details",
      completed: false,
      details: "Update more information about a task",
    },
  ]);

  function handleNewTask(task: TaskItem) {
    setTasks((old) => [task, ...old]);
  }

  function handleTaskCompleteUpdated(task: TaskItem, completed: boolean) {
    setTasks((old) => old.map((o) => (o === task ? { ...o, completed } : o)));
  }

  return (
    <FrontPage
      tasks={tasks}
      onNewTask={handleNewTask}
      onTaskCompeteUpdated={handleTaskCompleteUpdated}
    />
  );
}

createRoot(document.getElementById("app")!).render(
  <HashRouter>
    <Application />
  </HashRouter>,
);
