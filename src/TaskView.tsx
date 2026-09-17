import type { TaskItem } from "./TaskItem.js";

export default function TaskView({ task }: { task: TaskItem }) {
  return (
    <>
      <h1>Task: {task.description}</h1>

      <div>{task.details}</div>
    </>
  );
}
