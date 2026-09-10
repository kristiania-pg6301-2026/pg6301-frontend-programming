import { createRoot } from "react-dom/client";
import TaskList from "./TaskList";

function Application() {
  const tasks = [
    { description: "create npm project" },
    { description: "create react code" },
  ];
  return (
    <>
      <h1>My Tasks</h1>
      <TaskList tasks={tasks} />
    </>
  );
}

createRoot(document.getElementById("app")).render(<Application />);
