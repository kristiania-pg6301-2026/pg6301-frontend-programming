import { useParams } from "react-router-dom";
import TaskView from "./TaskView.js";
import { useContext } from "react";
import { TasksContext } from "./tasksContext.js";

export default function TaskPage() {
  const { id } = useParams();
  const { tasks } = useContext(TasksContext);

  const task = tasks.find((t) => t.id === parseInt(id!));
  if (!task) return <h1>Not found: Task with id {id}</h1>;
  return <TaskView task={task} />;
}
