import type { TaskItem } from "./TaskItem.js";
import { useState } from "react";
import { Link } from "react-router-dom";
import Dialog from "./Dialog.js";
import TaskDetailsForm from "./TaskDetailsForm.js";

export default function TaskView({ task }: { task: TaskItem }) {
  const [isEditing, setIsEditing] = useState(false);

  function handleClose() {
    setIsEditing(false);
  }

  return (
    <>
      <h1>Task: {task.description}</h1>
      <div>
        <Link to={"/"}>Back</Link>
      </div>

      <h2>Details {isEditing && "editing"}</h2>
      <Dialog isOpen={isEditing} onClose={handleClose}>
        <TaskDetailsForm task={task} onClose={handleClose} />
      </Dialog>

      <div>{task.details}</div>
      <button onClick={() => setIsEditing(true)}>Edit</button>
    </>
  );
}
