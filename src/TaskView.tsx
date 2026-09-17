import type { TaskItem } from "./TaskItem.js";
import { type SubmitEvent, useEffect, useRef, useState } from "react";

export default function TaskView({
  task,
  onChangeTaskDetail,
}: {
  task: TaskItem;
  onChangeTaskDetail(id: number, description: string): void;
}) {
  const [details, setDetails] = useState(task.details || "");
  const [isEditing, setIsEditing] = useState(false);

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (isEditing) dialogRef.current!.showModal();
    else dialogRef.current!.close();
  }, [isEditing]);

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

      <dialog ref={dialogRef}>
        <form onSubmit={handleSubmit}>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          <div>
            <button>Save</button>
          </div>
        </form>
      </dialog>
    </>
  );
}
