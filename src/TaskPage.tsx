import { useParams } from "react-router-dom";
import TaskView from "./TaskView.js";
import { useContext } from "react";
import { TaskContext } from "./taskContext.js";

export default function TaskPage() {
  const { id } = useParams();

  const { tasks } = useContext(TaskContext);

  const task = tasks.find((t) => t.id === parseInt(id!));
  if (!task) return <h1>Not found: Task with id {id}</h1>;
  return <TaskView task={task} />;
}
