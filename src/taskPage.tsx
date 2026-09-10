import type { OnUpdateTask, TaskItem } from "./taskItem.js";
import { useParams, useNavigate } from "react-router-dom";
import { type SubmitEvent, useState } from "react";

function TaskView({
  task,
  onUpdateTask,
}: {
  task: TaskItem;
  onUpdateTask: OnUpdateTask;
}) {
  const [details, setDetails] = useState(task.details || "");
  const navigate = useNavigate();

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    onUpdateTask(task.id, { details });
    navigate("/");
  }

  return (
    <>
      <h2>{task.description}</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <div>
          <button>Update</button>
        </div>
      </form>
    </>
  );
}

export function TaskPage({
  tasks,
  onUpdateTask,
}: {
  tasks: TaskItem[];
  onUpdateTask: OnUpdateTask;
}) {
  const { id } = useParams();

  const task = id && tasks.find((t) => t.id === parseInt(id));
  if (!task) return <h1>Missing task with id {id}</h1>;

  return <TaskView task={task} onUpdateTask={onUpdateTask} />;
}
