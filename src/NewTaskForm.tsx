import { type SubmitEvent, useContext, useState } from "react";
import { TaskListContext } from "./taskListContext.js";

export default function NewTaskForm() {
  const { onNewTask } = useContext(TaskListContext);
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
