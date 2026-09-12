import { Link } from "react-router-dom";
import { useContext } from "react";
import { TaskListContext } from "./taskListContext.js";

export default function TaskList() {
  const { tasks, onUpdateTask } = useContext(TaskListContext);
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
            onChange={(e) =>
              onUpdateTask(t.id, { completed: e.target.checked })
            }
          />
          <Link to={`/tasks/${t.id}`}>{t.description}</Link>
        </li>
      ))}
    </ul>
  );
}
