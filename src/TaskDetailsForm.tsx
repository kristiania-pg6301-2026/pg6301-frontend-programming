import type { TaskItem } from "./TaskItem.js";
import { useContext, useState, type SubmitEvent } from "react";
import { TaskListContext } from "./taskListContext.js";

export default function TaskDetailsForm({
  task,
  onClose,
}: {
  task: TaskItem;
  onClose(): void;
}) {
  const { onUpdateTask } = useContext(TaskListContext);
  const [details, setDetails] = useState(task.details || "");

  function handleSave(event: SubmitEvent) {
    event.preventDefault();
    onUpdateTask(task.id, { details });
    onClose();
  }

  return (
    <form onSubmit={handleSave}>
      <div>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <div>
          <button>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </form>
  );
}
