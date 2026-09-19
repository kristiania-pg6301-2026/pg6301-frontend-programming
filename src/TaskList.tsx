import { Link } from "react-router-dom";
import { useContext } from "react";
import { TasksContext } from "./tasksContext.js";

export default function TaskList() {
  const { tasks, onTaskUpdate } = useContext(TasksContext);
  return (
    <ul>
      {tasks.map((t) => (
        <li
          key={t.id}
          style={{
            textDecoration: t.completed ? "line-through" : undefined,
          }}
        >
          <input
            type={"checkbox"}
            checked={t.completed}
            onChange={(e) =>
              onTaskUpdate(t.id, { completed: e.target.checked })
            }
          />
          <Link to={`/tasks/${t.id}`}>{t.description}</Link>
        </li>
      ))}
    </ul>
  );
}
