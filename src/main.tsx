import { createRoot } from "react-dom/client";
import { FrontPage } from "./frontPage.js";
import { useState } from "react";
import type { OnNewTask, OnUpdateTask, TaskItem } from "./taskItem.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TaskPage } from "./taskPage.js";

function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: 0, description: "create npm app", completed: true },
    { id: 1, description: "create react app", completed: true },
    { id: 2, description: "checkboxes", completed: true },
    {
      id: 3,
      description: "details",
      details: "Implement detail view",
      completed: false,
    },
  ]);

  const handleNewTask: OnNewTask = (task) =>
    setTasks((old) => [...old, { id: old.length, ...task }]);

  const handleUpdateTask: OnUpdateTask = (id, delta) =>
    setTasks((old) => old.map((o) => (o.id === id ? { ...o, ...delta } : o)));

  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <FrontPage
            tasks={tasks}
            onUpdateTask={handleUpdateTask}
            onNewTask={handleNewTask}
          />
        }
      />
      <Route
        path={"/tasks/:id"}
        element={<TaskPage tasks={tasks} onUpdateTask={handleUpdateTask} />}
      />
      <Route path={"*"} element={<h1>Not found</h1>} />
    </Routes>
  );
}

createRoot(document.getElementById("app")!).render(
  <BrowserRouter>
    <Application />
  </BrowserRouter>,
);
