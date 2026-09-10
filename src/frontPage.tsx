import type { OnNewTask, OnUpdateTask, TaskItem } from "./taskItem.js";
import { TaskList } from "./taskList.js";
import { NewTaskForm } from "./newTaskForm.js";

export function FrontPage({
  tasks,
  onUpdateTask,
  onNewTask,
}: {
  tasks: TaskItem[];
  onUpdateTask: OnUpdateTask;
  onNewTask: OnNewTask;
}) {
  return (
    <>
      <h1>Tasks</h1>
      <TaskList tasks={tasks} onUpdateTask={onUpdateTask} />
      <h2>Create new task</h2>
      <NewTaskForm onNewTask={onNewTask} />
      <pre>{JSON.stringify(tasks, null, 2)}</pre>
    </>
  );
}
