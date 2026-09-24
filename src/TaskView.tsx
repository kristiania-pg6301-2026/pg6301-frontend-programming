import type { TaskItem } from "./TaskItem.js";
import { type SubmitEvent, useContext, useState } from "react";
import Dialog from "./Dialog.js";
import { TaskContext } from "./taskContext.js";

export default function TaskView({ task }: { task: TaskItem }) {
  const [details, setDetails] = useState(task.details || "");
  const [isEditing, setIsEditing] = useState(false);
  const { onTaskUpdate } = useContext(TaskContext);

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
