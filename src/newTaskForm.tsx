import { useState } from "react";

export function NewTaskForm({ onNewTask }: any) {
  const [desciption, setDesciption] = useState("");

  function handleSubmit(event: any) {
    event.preventDefault();
    onNewTask({ desciption });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Description:{" "}
        <input
          value={desciption}
          onChange={(e) => setDesciption(e.target.value)}
        />
      </div>
      <div>
        <button>Save {desciption}</button>
      </div>
    </form>
  );
}
