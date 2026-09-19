import * as React from "react";
import type { TaskItem } from "./TaskItem.js";

export const TasksContext = React.createContext<{
  tasks: TaskItem[];
  onNewTask(task: Omit<TaskItem, "id">): void;
  onTaskUpdate(id: number, delta: Partial<TaskItem>): void;
}>({
  tasks: [],
  onNewTask: (_) => {},
  onTaskUpdate: (_) => {},
});
