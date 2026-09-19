import { type SubmitEvent, useContext, useState } from "react";
import { TasksContext } from "./tasksContext.js";

export default function NewTaskForm() {
  const [description, setDescription] = useState("");
  const { onNewTask } = useContext(TasksContext);
  const [error, setError] = useState<Error>();
  const [updating, setUpdating] = useState(false);

  async function handleSubmit(event: SubmitEvent) {
    setUpdating(true);
    event.preventDefault();
    setError(undefined);
    try {
      await onNewTask({ description, completed: false });
    } catch (error) {
      setError(error as Error);
    } finally {
      setUpdating(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {updating && <div>updating</div>}
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
