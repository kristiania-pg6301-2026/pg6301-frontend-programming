import { type SubmitEvent, useContext, useState } from "react";
import { TasksContext } from "./tasksContext.js";
import ErrorView from "./ErrorView.js";

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
      {updating && <div className={"progress"}>updating</div>}
      {error && <ErrorView error={error} />}
      <div>
        Task:{" "}
        <input
          type="text"
          value={description}
          required
          onInvalid={(e) => {
            const input = e.target as HTMLInputElement;
            if (input.value.length < 5) return;
            input.setCustomValidity(
              "The description must be xx-something, where xx is a number",
            );
          }}
          autoFocus
          pattern={"[0-9]{1,3}-.*"}
          minLength={5}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <button>Save {description}</button>
      </div>
    </form>
  );
}
