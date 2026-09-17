import type { TaskItem } from "./TaskItem.js";
import { useParams } from "react-router-dom";
import TaskView from "./TaskView.js";

export default function TaskPage({
  tasks,
  onTaskUpdate,
}: {
  tasks: TaskItem[];
  onTaskUpdate(
    id: number,
    delta: { details: string; completed?: boolean },
  ): void;
}) {
  const { id } = useParams();

  const task = tasks.find((t) => t.id === parseInt(id!));
  if (!task) return <h1>Not found: Task with id {id}</h1>;
  return <TaskView task={task} onTaskUpdate={onTaskUpdate} />;
}
