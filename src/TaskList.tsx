import type { TaskItem } from "./TaskItem.js";

export default function TaskList({ tasks }: { tasks: TaskItem[] }) {
  return (
    <ul>
      {tasks.map((t) => (
        <li>{t.description}</li>
      ))}
    </ul>
  );
}
