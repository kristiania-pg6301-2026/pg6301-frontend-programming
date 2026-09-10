import { createRoot } from "react-dom/client";
import { FrontPage } from "./frontPage.js";
import { useState } from "react";
import type { TaskItem } from "./taskItem.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
    <Routes>
      <Route
        path={"/"}
        element={
          <FrontPage
            tasks={tasks}
            onCheckedChanged={handleCheckedChanged}
            onNewTask={handleNewTask}
          />
        }
      />
      <Route path={"/tasks/id"} element={<h1>A task</h1>} />
      <Route path={"*"} element={<h1>Not found</h1>} />
    </Routes>
  );
}

createRoot(document.getElementById("app")!).render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
);
