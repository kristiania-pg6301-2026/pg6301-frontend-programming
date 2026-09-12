import type { TaskItem } from "./TaskItem.js";
import { useParams } from "react-router-dom";
import TaskView from "./TaskView.js";

export default function TaskPage({
  tasks,
  onUpdateTaskDetails,
}: {
  tasks: TaskItem[];
  onUpdateTaskDetails(id: number, value: string): void;
}) {
  const { id } = useParams();

  const task = tasks.find((t) => t.id === parseInt(id!));
  if (!task) return <h1>Not found: Task with id {id}</h1>;
  return <TaskView task={task} onUpdateTaskDetails={onUpdateTaskDetails} />;
}
