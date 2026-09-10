import React from "react";
import type { TaskItem } from "./taskItem.js";
import { Link } from "react-router-dom";

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
          <Link to={`/tasks/${t.id}`}>{t.description}</Link>
        </li>
      ))}
    </ul>
  );
}
