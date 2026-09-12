import type { TaskItem } from "./TaskItem.js";
import { type SubmitEvent, useState } from "react";
import { Link } from "react-router-dom";
import Dialog from "./Dialog.js";

export default function TaskView({
  task,
  onUpdateTask,
}: {
  task: TaskItem;
  onUpdateTask(id: number, delta: Partial<TaskItem>): void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState(task.details || "");

  function handleSave(event: SubmitEvent) {
    event.preventDefault();
    onUpdateTask(task.id, { details });
    setIsEditing(false);
  }

  function handleCancel() {
    setDetails(task.details || "");
    setIsEditing(false);
  }

  return (
    <>
      <h1>Task: {task.description}</h1>
      <div>
        <Link to={"/"}>Back</Link>
      </div>

      <h2>Details {isEditing && "editing"}</h2>
      <Dialog isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <form onSubmit={handleSave}>
          <div>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            <div>
              <button>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </form>
      </Dialog>

      <div>{task.details}</div>
      <button onClick={() => setIsEditing(true)}>Edit</button>
    </>
  );
}
