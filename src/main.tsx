import { createRoot } from "react-dom/client";
import * as React from "react";
import { useEffect, useState } from "react";
import type { TaskItem } from "./TaskItem.js";
import { HashRouter, Route, Routes } from "react-router-dom";
import FrontPage from "./FrontPage.js";
import TaskPage from "./TaskPage.js";
import { TasksContext } from "./tasksContext.js";

import "./application.css";

function doExpensiveOperation() {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) return reject(new Error("something went wrong"));
      resolve("something happened");
    }, 500);
  });
}

function expensivelyTransformResult(input: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        return reject(new Error("inner error"));
      }
      resolve(input.length);
    }, 500);
  });
}

function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [error, setError] = useState<Error>();

  async function fetchTasks() {
    const res = await fetch("/api/tasks");
    setTasks(await res.json());
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function handleNewTask(task: Omit<TaskItem, "id">) {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!res.ok) {
      throw new Error(`Failed to write task: ${res.status} ${res.statusText}`);
    }
    fetchTasks();
  }

  async function handleTaskUpdate(id: number, delta: Partial<TaskItem>) {
    setError(undefined);
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(delta),
    });
    if (res.ok) {
      fetchTasks();
    } else {
      setError(
        new Error(`Failed to update task: ${res.status} ${res.statusText}`),
      );
    }
  }

  useEffect(() => {
    doExpensiveOperation()
      .then((res) => expensivelyTransformResult(res))
      .then((res) => alert("Here we go: " + res))
      .catch((error) => alert("something went wrong: " + error));
  }, []);

  return (
    <TasksContext
      value={{
        tasks,
        onNewTask: handleNewTask,
        onTaskUpdate: handleTaskUpdate,
      }}
    >
      {error && <div className={"error"}>{error.toString()}</div>}
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
