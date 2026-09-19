import { createRoot } from "react-dom/client";
import * as React from "react";
import { useEffect, useState } from "react";
import type { TaskItem } from "./TaskItem.js";
import { HashRouter, Route, Routes } from "react-router-dom";
import FrontPage from "./FrontPage.js";
import TaskPage from "./TaskPage.js";
import { TasksContext } from "./tasksContext.js";

function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: 0, description: "Show current tasks", completed: true },
    { id: 1, description: "Create new tasks", completed: true },
    { id: 2, description: "Mark task as done", completed: true },
    { id: 3, description: "Implement routing", completed: true },
    {
      id: 4,
      description: "Edit task details",
      completed: true,
      details: "Update more information about a task",
    },
    {
      id: 5,
      description: "Use context to avoid props drilling",
      completed: false,
    },
  ]);

  async function fetchTasks() {
    const res = await fetch("/api/tasks");
    setTasks(await res.json());
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  function handleNewTask(task: Omit<TaskItem, "id">) {
    setTasks((old) => [{ id: old.length, ...task }, ...old]);
  }

  function handleTaskUpdate(id: number, delta: Partial<TaskItem>) {
    setTasks((old) => old.map((o) => (o.id === id ? { ...o, ...delta } : o)));
  }

  return (
    <TasksContext
      value={{
        tasks,
        onTaskUpdate: handleTaskUpdate,
        onNewTask: handleNewTask,
      }}
    >
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/tasks/:id"} element={<TaskPage />} />
        <Route path={"*"} element={<h1>Page not found</h1>} />
      </Routes>
    </TasksContext>
  );
}

createRoot(document.getElementById("app")!).render(
  <HashRouter>
    <Application />
  </HashRouter>,
);
