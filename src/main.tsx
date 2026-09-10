import { createRoot } from "react-dom/client";
import { FrontPage } from "./frontPage.js";
import { useState } from "react";
import type { TaskItem } from "./taskItem.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TaskPage } from "./taskPage.js";

function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: 0, description: "create npm app", completed: true },
    { id: 1, description: "create react app", completed: true },
    { id: 2, description: "checkboxes", completed: true },
    { id: 3, description: "details", completed: false },
  ]);

  function handleNewTask(task: Omit<TaskItem, "id">) {
    setTasks((old) => [...old, { id: old.length, ...task }]);
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
      <Route path={"/tasks/:id"} element={<TaskPage tasks={tasks} />} />
      <Route path={"*"} element={<h1>Not found</h1>} />
    </Routes>
  );
}

createRoot(document.getElementById("app")!).render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
);
