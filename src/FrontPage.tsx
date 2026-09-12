import type { TaskItem } from "./TaskItem.js";
import TaskList from "./TaskList.js";
import NewTaskForm from "./NewTaskForm.js";

export default function FrontPage({}: {}) {
  return (
    <>
      <h1>My Tasks</h1>
      <TaskList />
      <h2>Create new task</h2>
      <NewTaskForm />
    </>
  );
}
