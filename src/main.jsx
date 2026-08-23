import { createRoot } from "react-dom/client";

function Application() {
  return (
    <>
      <h1>My tasks</h1>

      <h2>Create new tasks</h2>

      <form>
        <div>
          <label>Task: </label>
          <input type="text" />
        </div>
        <div>
          <button>Save task</button>
        </div>
      </form>

      <h2>Existing tasks</h2>
    </>
  );
}

createRoot(document.getElementById("app")).render(<Application />);
