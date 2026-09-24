import { createRoot } from "react-dom/client";
import React, { useEffect, useState } from "react";
import type { TaskItem } from "./TaskItem.js";
import { HashRouter, Route, Routes } from "react-router-dom";
import FrontPage from "./FrontPage.js";
import TaskPage from "./TaskPage.js";
import { TaskContext } from "./taskContext.js";

async function delay(number: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, number));
}

function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  function handleNewTask(task: Omit<TaskItem, "id">) {
    fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    }).then((res) => {
      loadTasks();
    });
  }

  function handleTaskUpdate(id: number, delta: Partial<TaskItem>) {
    fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(delta),
    }).then((res) => {
      loadTasks();
    });
  }

  function loadTasks() {
    fetch("/api/tasks").then((res) => {
      res.json().then((json) => setTasks(json));
    });
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function fetchTasks() {
    await delay(200);
    return [
      { id: 0, description: "Hei", completed: true },
      { id: 1, description: "Hei", completed: true },
    ];
  }

  async function setTaskUnchecked(task: TaskItem) {
    await delay(Math.random() * 1000 + 100);
  }

  async function refreshTasks() {
    await delay(Math.random() * 500 + 100);
  }

  async function handleClickUnset() {
    const tasks = await fetchTasks();
    console.log("I got " + JSON.stringify(tasks));
    await Promise.all(
      tasks.map((t) =>
        setTaskUnchecked(t).then(() =>
          console.log(`marked task ${t.id} as done`),
        ),
      ),
    );
    await refreshTasks();
    console.log("done refreshing");
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
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/tasks/:id"} element={<TaskPage />} />
        <Route path={"*"} element={<h1>Page not found</h1>} />
      </Routes>
      <button onClick={handleClickUnset}>Set all as undone</button>
    </TaskContext>
  );
}

createRoot(document.getElementById("app")!).render(
  <HashRouter>
    <Application />
  </HashRouter>,
);
