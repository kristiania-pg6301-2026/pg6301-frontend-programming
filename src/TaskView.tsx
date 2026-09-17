import type { TaskItem } from "./TaskItem.js";

export default function TaskView({
  task,
  onChangeTaskDetail,
}: {
  task: TaskItem;
  onChangeTaskDetail(id: number, description: string): void;
}) {
  return (
    <>
      <h1>Task: {task.description}</h1>

      <textarea
        value={task.details}
        onChange={(e) => onChangeTaskDetail(task.id, e.target.value)}
      />
    </>
  );
}
