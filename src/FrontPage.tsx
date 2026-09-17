import type { TaskItem } from "./TaskItem.js";
import TaskList from "./TaskList.js";
import NewTaskForm from "./NewTaskForm.js";

export default function FrontPage({
  tasks,
  onNewTask,
  onTaskUpdate,
}: {
  tasks: TaskItem[];
  onNewTask: (task: Omit<TaskItem, "id">) => void;
  onTaskUpdate: (id: number, delta: Partial<TaskItem>) => void;
}) {
  return (
    <>
      <h1>My Tasks</h1>
      <TaskList tasks={tasks} onTaskUpdate={onTaskUpdate} />
      <h2>Create new task</h2>
      <NewTaskForm onNewTask={onNewTask} />
    </>
  );
}
