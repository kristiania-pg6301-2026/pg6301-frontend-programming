import React from "react";
import type { OnUpdateTask, TaskItem } from "./taskItem.js";
import { Link } from "react-router-dom";

export function TaskList({
  tasks,
  onUpdateTask,
}: {
  tasks: TaskItem[];
  onUpdateTask: OnUpdateTask;
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
            onChange={(e) =>
              onUpdateTask(t.id, { completed: e.target.checked })
            }
          />{" "}
          <Link to={`/tasks/${t.id}`}>{t.description}</Link>
        </li>
      ))}
    </ul>
  );
}
