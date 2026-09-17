import type { TaskItem } from "./TaskItem.js";
import { type SubmitEvent, useState } from "react";

export default function TaskView({
  task,
  onChangeTaskDetail,
}: {
  task: TaskItem;
  onChangeTaskDetail(id: number, description: string): void;
}) {
  const [details, setDetails] = useState(task.details || "");
  const [isEditing, setIsEditing] = useState(false);

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    onChangeTaskDetail(task.id, details);
    setIsEditing(false);
  }

  return (
    <>
      <h1>Task: {task.description}</h1>

      {task.details}

      <div>
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit}>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          <div>
            <button>Save</button>
          </div>
        </form>
      )}
    </>
  );
}
