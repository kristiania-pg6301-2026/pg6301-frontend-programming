import { type SubmitEvent, useState } from "react";
import type { OnNewTask } from "./taskItem.js";

export function NewTaskForm({ onNewTask }: { onNewTask: OnNewTask }) {
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
