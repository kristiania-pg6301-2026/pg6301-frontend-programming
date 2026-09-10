import { useState, type SubmitEvent } from "react";
import type { TaskItem } from "./taskItem.js";

export function NewTaskForm({
  onNewTask,
}: {
  onNewTask(task: TaskItem): void;
}) {
  const [description, setDescription] = useState("");

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    onNewTask({ description, completed: false });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Description:{" "}
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <button>Save {description}</button>
      </div>
    </form>
  );
}
