import type { TaskItem } from "./TaskItem.js";
import TaskList from "./TaskList.js";
import NewTaskForm from "./NewTaskForm.js";

export default function FrontPage({
  tasks,
  onNewTask,
  onUpdateTask,
}: {
  tasks: TaskItem[];
  onNewTask: (task: Omit<TaskItem, "id">) => void;
  onUpdateTask: (id: number, delta: Partial<TaskItem>) => void;
}) {
  return (
    <>
      <h1>My Tasks</h1>
      <TaskList tasks={tasks} onUpdateTask={onUpdateTask} />
      <h2>Create new task</h2>
      <NewTaskForm onNewTask={onNewTask} />
    </>
  );
}
