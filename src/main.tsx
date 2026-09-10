import { createRoot } from "react-dom/client";
import { useState } from "react";
import { TaskList } from "./taskList.js";
import { NewTaskForm } from "./newTaskForm.js";
import type { TaskItem } from "./taskItem.js";

function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([
    { description: "create npm app", completed: true },
    { description: "create react app", completed: true },
    { description: "checkboxes", completed: false },
  ]);

  function handleNewTask(task: TaskItem) {
    setTasks((old) => [...old, task]);
  }

  function handleCheckedChanged(task: TaskItem, completed: boolean) {
    setTasks((old) => old.map((o) => (o === task ? { ...o, completed } : o)));
  }

  return (
    <>
      <h1>Tasks</h1>
      <TaskList tasks={tasks} onCheckedChanged={handleCheckedChanged} />
      <h2>Create new task</h2>
      <NewTaskForm onNewTask={handleNewTask} />
      <pre>{JSON.stringify(tasks, null, 2)}</pre>
    </>
  );
}

createRoot(document.getElementById("app")!).render(<Application />);
