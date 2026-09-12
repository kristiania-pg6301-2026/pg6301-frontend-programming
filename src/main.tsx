import { createRoot } from "react-dom/client";
import * as React from "react";
import { useState } from "react";
import type { TaskItem } from "./TaskItem.js";
import { HashRouter, Route, Routes } from "react-router-dom";
import FrontPage from "./FrontPage.js";
import TaskPage from "./TaskPage.js";
import { TaskListContext } from "./taskListContext.js";

function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: 0, description: "Show current tasks", completed: true },
    { id: 1, description: "Create new tasks", completed: true },
    { id: 2, description: "Mark task as done", completed: true },
    { id: 3, description: "Implement routing", completed: true },
    {
      id: 4,
      description: "Update task details",
      completed: false,
      details: "Update more information about a task",
    },
  ]);

  function handleNewTask(task: Omit<TaskItem, "id">) {
    setTasks((old) => [{ id: old.length, ...task }, ...old]);
  }

  function handleUpdateTask(id: number, delta: Partial<TaskItem>) {
    setTasks((old) => old.map((o) => (o.id === id ? { ...o, ...delta } : o)));
  }

  return (
    <TaskListContext
      value={{
        tasks,
        onUpdateTask: handleUpdateTask,
        onNewTask: handleNewTask,
      }}
    >
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/tasks/:id"} element={<TaskPage />} />
        <Route path={"*"} element={<h1>Page not found</h1>} />
      </Routes>
    </TaskListContext>
  );
}

createRoot(document.getElementById("app")!).render(
  <HashRouter>
    <Application />
  </HashRouter>,
);
