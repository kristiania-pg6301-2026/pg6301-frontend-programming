import React from "react";

export function TaskList({ tasks }: { tasks: any[] }) {
  return (
    <ul>
      {tasks.map((t) => (
        <li>{t.description}</li>
      ))}
    </ul>
  );
}
