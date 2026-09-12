import * as React from "react";
import type { TaskItem } from "./TaskItem.js";

export const TaskListContext = React.createContext<{
  tasks: TaskItem[];
  onNewTask(task: Omit<TaskItem, "id">): void;
  onUpdateTask(id: number, task: Partial<TaskItem>): void;
}>({
  tasks: [],
  onNewTask: () => {},
  onUpdateTask: () => {},
});
