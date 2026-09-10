import type { TaskItem } from "./TaskItem.js";

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
        <li>
          <input
            type={"checkbox"}
            checked={t.completed}
            onChange={(e) => onTaskCompleteUpdated(t, e.target.checked)}
          />
          {t.description}
        </li>
      ))}
    </ul>
  );
}
