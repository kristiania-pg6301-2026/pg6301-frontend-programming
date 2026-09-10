import type { TaskItem } from "./TaskItem.js";

export default function TaskList({ tasks }: { tasks: TaskItem[] }) {
  return (
    <ul>
      {tasks.map((t) => (
        <li>
          <input type={"checkbox"} checked={t.completed} />
          {t.description}
        </li>
      ))}
    </ul>
  );
}
