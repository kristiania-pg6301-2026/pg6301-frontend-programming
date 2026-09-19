import { type SubmitEvent, useContext, useState } from "react";
import { TasksContext } from "./tasksContext.js";

export default function NewTaskForm() {
  const [description, setDescription] = useState("");
  const { onNewTask } = useContext(TasksContext);
  const [error, setError] = useState<Error>();

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    setError(undefined);
    try {
      await onNewTask({ description, completed: false });
    } catch (error) {
      setError(error as Error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className={"error"}>{error.toString()}</div>}
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
