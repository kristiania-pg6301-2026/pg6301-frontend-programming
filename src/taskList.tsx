import React from "react";
import type { TaskItem } from "./taskItem.js";

export function TaskList({ tasks }: { tasks: TaskItem[] }) {
  return (
    <ul>
      {tasks.map((t) => (
        <li>{t.description}</li>
      ))}
    </ul>
  );
}
