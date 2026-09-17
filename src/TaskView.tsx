import type { TaskItem } from "./TaskItem.js";
import { type SubmitEvent, useEffect, useRef, useState } from "react";
import Dialog from "./Dialog.js";

export default function TaskView({
  task,
  onTaskUpdate,
}: {
  task: TaskItem;
  onTaskUpdate(
    id: number,
    delta: { details: string; completed?: boolean },
  ): void;
}) {
  const [details, setDetails] = useState(task.details || "");
  const [isEditing, setIsEditing] = useState(false);

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    onTaskUpdate(task.id, { details });
    setIsEditing(false);
  }

  return (
    <>
      <h1>
        Task: {task.description} {isEditing && " (editing)"}
      </h1>

      <div>Details: {length} characters</div>

      {task.details}

      <div>
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </div>

      <Dialog isVisible={isEditing} setIsVisible={setIsEditing}>
        <form onSubmit={handleSubmit}>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          <div>
            <button>Save</button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
