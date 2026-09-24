import { createRoot } from "react-dom/client";
import React, { useEffect, useState } from "react";
import type { TaskItem } from "./TaskItem.js";
import { HashRouter, Route, Routes } from "react-router-dom";
import FrontPage from "./FrontPage.js";
import TaskPage from "./TaskPage.js";
import { TaskContext } from "./taskContext.js";

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

  function fetchTasks(callback: (tasks: TaskItem[]) => void) {
    setTimeout(() => {
      callback([
        { id: 0, description: "Hei", completed: true },
        { id: 1, description: "Hei", completed: true },
      ]);
    }, 200);
  }

  function setTaskUnchecked(task: TaskItem, callback: () => void) {
    setTimeout(
      () => {
        callback();
      },
      Math.random() * 1000 + 100,
    );
  }

  function refreshTasks(callback: () => void) {
    setTimeout(
      () => {
        callback();
      },
      Math.random() * 200 + 50,
    );
  }

  function handleClickUnset() {
    fetchTasks((tasks) => {
      console.log("I got " + JSON.stringify(tasks));
      for (const task of tasks) {
        setTaskUnchecked(task, () => {
          console.log(`marked ${task.id} as unchecked`);
          refreshTasks(() => {
            console.log("Done refreshing");
          });
        });
      }
    });
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
