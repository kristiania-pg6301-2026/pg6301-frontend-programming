import type { TaskItem } from "./TaskItem.js";
import { useParams } from "react-router-dom";

export default function TaskPage({ tasks }: { tasks: TaskItem[] }) {
  const { id } = useParams();

  const task = tasks.find((t) => t.id === parseInt(id!));
  if (!task) return <h1>Not found: Task with id {id}</h1>;
  return <h1>Task: {task.description}</h1>;
}
