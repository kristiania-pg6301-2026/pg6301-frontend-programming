import type { TaskItem } from "./TaskItem.js";
import { Link } from "react-router-dom";

export default function TaskList({
  tasks,
  onTaskCompleteUpdated,
}: {
  tasks: TaskItem[];
  onTaskCompleteUpdated(task: TaskItem, completed: boolean): void;
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
            onChange={(e) => onTaskCompleteUpdated(t, e.target.checked)}
          />
          <Link to={"/tasks/id"}>{t.description}</Link>
        </li>
      ))}
    </ul>
  );
}
