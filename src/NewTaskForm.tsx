import { useState, type SubmitEvent } from "react";
import type { TaskItem } from "./TaskItem.js";

export default function NewTaskForm({
  onNewTask,
}: {
  onNewTask(task: Omit<TaskItem, "id">): void;
}) {
  const [description, setDescription] = useState("");

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    onNewTask({ description, completed: false });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Task:{" "}
        <input
          type="text"
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
