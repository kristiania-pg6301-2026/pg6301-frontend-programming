import type { TaskItem } from "./taskItem.js";
import { useParams } from "react-router-dom";

function TaskView({ task }: { task: TaskItem }) {
  return <h2>{task.description}</h2>;
}

export function TaskPage({ tasks }: { tasks: TaskItem[] }) {
  const { id } = useParams();

  const task = id && tasks.find((t) => t.id === parseInt(id));
  if (!task) return <h1>Missing task with {id}</h1>;

  return <TaskView task={task} />;
}
