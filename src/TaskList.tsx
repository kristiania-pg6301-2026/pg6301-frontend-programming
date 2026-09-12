import type { TaskItem } from "./TaskItem.js";
import { Link } from "react-router-dom";

export default function TaskList({
  tasks,
  onTaskCompleteUpdated,
}: {
  tasks: TaskItem[];
  onTaskCompleteUpdated(id: number, completed: boolean): void;
}) {
  return (
    <ul>
      {tasks.map((t) => (
        <li
          style={{
            textDecoration: t.completed ? "line-through" : undefined,
          }}
        >
          <input
            type={"checkbox"}
            checked={t.completed}
            onChange={(e) => onTaskCompleteUpdated(t.id, e.target.checked)}
          />
          <Link to={`/tasks/${t.id}`}>{t.description}</Link>
        </li>
      ))}
    </ul>
  );
}
