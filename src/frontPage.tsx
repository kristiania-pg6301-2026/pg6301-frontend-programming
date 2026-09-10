import type { TaskItem } from "./taskItem.js";
import { TaskList } from "./taskList.js";
import { NewTaskForm } from "./newTaskForm.js";

export function FrontPage({
  tasks,
  onCheckedChanged,
  onNewTask,
}: {
  tasks: TaskItem[];
  onCheckedChanged(task: TaskItem, completed: boolean): void;
  onNewTask(task: TaskItem): void;
}) {
  return (
    <>
      <h1>Tasks</h1>
      <TaskList tasks={tasks} onCheckedChanged={onCheckedChanged} />
      <h2>Create new task</h2>
      <NewTaskForm onNewTask={onNewTask} />
      <pre>{JSON.stringify(tasks, null, 2)}</pre>
    </>
  );
}
