import { createRoot } from "react-dom/client";
import { useState } from "react";
import TaskList from "./TaskList.js";
import NewTaskForm from "./NewTaskForm.js";
import type { TaskItem } from "./TaskItem.js";

function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { description: "Show current tasks", completed: true },
    { description: "Create new tasks", completed: true },
    { description: "Mark task as done", completed: true },
  ]);

  function handleNewTask(task: TaskItem) {
    setTasks((old) => [task, ...old]);
  }

  function handleTaskCompleteUpdated(task: TaskItem, completed: boolean) {
    setTasks((old) => old.map((o) => (o === task ? { ...o, completed } : o)));
  }

  return (
    <>
      <h1>My Tasks</h1>
      <TaskList
        tasks={tasks}
        onTaskCompleteUpdated={handleTaskCompleteUpdated}
      />
      <h2>Create new task</h2>
      <NewTaskForm onNewTask={handleNewTask} />
    </>
  );
}

createRoot(document.getElementById("app")!).render(<Application />);
