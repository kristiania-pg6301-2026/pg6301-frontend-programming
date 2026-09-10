export function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map((t) => (
        <li>{t.description}</li>
      ))}
    </ul>
  );
}
