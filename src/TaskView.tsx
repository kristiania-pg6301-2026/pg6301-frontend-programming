import type { TaskItem } from "./TaskItem.js";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function TaskView({
  task,
  onUpdateTaskDetails,
}: {
  task: TaskItem;
  onUpdateTaskDetails(id: number, value: string): void;
}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <h1>Task: {task.description}</h1>
      <div>
        <Link to={"/"}>Back</Link>
      </div>

      <h2>Details</h2>
      {isEditing && (
        <div>
          <textarea
            value={task.details}
            onChange={(e) => onUpdateTaskDetails(task.id, e.target.value)}
          ></textarea>
          <div>
            <button onClick={() => setIsEditing(false)}>Save</button>
          </div>
        </div>
      )}

      {isEditing || (
        <>
          <div>{task.details}</div>
          <button onClick={() => setIsEditing((b) => !b)}>Edit</button>
        </>
      )}
    </>
  );
}
