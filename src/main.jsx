import { createRoot } from "react-dom/client";

function Application() {
  const tasks = [
    { description: "create npm project" },
    { description: "create react code" },
  ];
  return (
    <>
      <h1>My Tasks</h1>
      {tasks.map((t) => (
        <li>{t.description}</li>
      ))}
    </>
  );
}

createRoot(document.getElementById("app")).render(<Application />);
