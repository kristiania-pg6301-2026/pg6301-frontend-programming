import { createRoot } from "react-dom/client";
import { useState } from "react";

function Application() {
  const [tasks, setTasks] = useState([
    { description: "create npm app" },
    { description: "create react app" },
  ]);

  return (
    <>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((t) => (
          <li>{t.description}</li>
        ))}
      </ul>
    </>
  );
}

createRoot(document.getElementById("app")).render(<Application />);
