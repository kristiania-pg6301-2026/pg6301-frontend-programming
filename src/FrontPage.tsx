import TaskList from "./TaskList.js";
import NewTaskForm from "./NewTaskForm.js";
import type { TaskItem } from "./TaskItem.js";

function fetchAllTaskItems(callback: (tasks: TaskItem[]) => void) {
  fetch("/api/tasks")
    .then((res) => {
      if (!res.ok)
        throw new Error(`HTTP failure ${res.status} ${res.statusText}`);
      return res.json();
    })
    .then((res) => callback(res));
}

function setTaskItem(
  id: number,
  delta: { completed: boolean },
  callback: () => void,
) {
  fetch(`/api/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(delta),
  }).then((res) => callback());
}

export default function FrontPage() {
  function handleClickCheckAll() {
    fetchAllTaskItems((tasks) => {
      for (const task of tasks) {
        setTaskItem(task.id, { completed: true }, () => {
          console.log("done");
        });
      }
    });
    console.log("all done");
  }

  function handleClickUncheckAll() {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((tasks: TaskItem[]) => tasks.map((t) => t.id))
      .then((ids) =>
        Promise.all(
          ids.map((id) =>
            fetch(`/api/tasks/${id}`, {
              method: "PUT",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify({ completed: false }),
            }),
          ),
        ),
      )
      .then((res) => console.log("done", res));
  }

  return (
    <>
      <h1>My Tasks</h1>
      <TaskList />
      <div>
        <button onClick={handleClickCheckAll}>Check All</button>
      </div>
      <div>
        <button onClick={handleClickUncheckAll}>Uncheck all</button>
      </div>
      <h2>Create new task</h2>
      <NewTaskForm />
    </>
  );
}
