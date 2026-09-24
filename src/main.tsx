import { createRoot } from "react-dom/client";
import React, { useState } from "react";
import type { TaskItem } from "./TaskItem.js";
import { HashRouter, Route, Routes } from "react-router-dom";
import FrontPage from "./FrontPage.js";
import TaskPage from "./TaskPage.js";
import { TaskContext } from "./taskContext.js";

function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: 0, description: "Show current tasks", completed: true },
    { id: 1, description: "Create new tasks", completed: true },
    { id: 2, description: "Mark task as done", completed: true },
    { id: 3, description: "Implement routing", completed: true },
    {
      id: 4,
      description: "Edit task details",
      completed: false,
      details: "Update more information about a task",
    },
  ]);

  function handleNewTask(task: Omit<TaskItem, "id">) {
    setTasks((old) => [{ id: old.length, ...task }, ...old]);
  }

  function handleTaskUpdate(id: number, delta: Partial<TaskItem>) {
    setTasks((old) => old.map((o) => (o.id === id ? { ...o, ...delta } : o)));
  }

  return (
    <TaskContext
      value={{
        tasks,
        onNewTask: handleNewTask,
        onTaskUpdate: handleTaskUpdate,
      }}
    >
      <Routes>
        <Route
          path={"/"}
          element={
            <FrontPage
              tasks={tasks}
              onNewTask={handleNewTask}
              onTaskUpdate={handleTaskUpdate}
            />
          }
        />
        <Route path={"/tasks/:id"} element={<TaskPage />} />
        <Route path={"*"} element={<h1>Page not found</h1>} />
      </Routes>
    </TaskContext>
  );
}

createRoot(document.getElementById("app")!).render(
  <HashRouter>
    <Application />
  </HashRouter>,
);
