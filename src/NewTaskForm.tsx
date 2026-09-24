import { useState, type SubmitEvent, useContext } from "react";
import type { TaskItem } from "./TaskItem.js";
import { TaskContext } from "./taskContext.js";

export default function NewTaskForm() {
  const [description, setDescription] = useState("");
  const { onNewTask } = useContext(TaskContext);

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
