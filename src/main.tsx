import { createRoot } from "react-dom/client";
import { FrontPage } from "./frontPage.js";
import { useState } from "react";
import type { TaskItem } from "./taskItem.js";

function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { description: "create npm app", completed: true },
    { description: "create react app", completed: true },
    { description: "checkboxes", completed: true },
    { description: "details", completed: false },
  ]);

  function handleNewTask(task: TaskItem) {
    setTasks((old) => [...old, task]);
  }

  function handleCheckedChanged(task: TaskItem, completed: boolean) {
    setTasks((old) => old.map((o) => (o === task ? { ...o, completed } : o)));
  }
  return (
    <FrontPage
      tasks={tasks}
      onCheckedChanged={handleCheckedChanged}
      onNewTask={handleNewTask}
    />
  );
}

createRoot(document.getElementById("app")!).render(<Application />);
