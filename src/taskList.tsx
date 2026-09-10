import React from "react";
import type { TaskItem } from "./taskItem.js";

export function TaskList({
  tasks,
  onCheckedChanged,
}: {
  tasks: TaskItem[];
  onCheckedChanged(task: TaskItem, completed: boolean): void;
}) {
  return (
    <ul>
      {tasks.map((t) => (
        <li
          style={{ textDecoration: t.completed ? "line-through" : undefined }}
        >
          <input
            type={"checkbox"}
            checked={t.completed}
            onChange={(e) => onCheckedChanged(t, e.target.checked)}
          />{" "}
          {t.description}
        </li>
      ))}
    </ul>
  );
}
