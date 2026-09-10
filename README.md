# Lecture 4: React, useState and props

We will review the React topics from the last lecture: Creating a React app, creating functional components and using
props and state.

## Set up a NPM React project

```shell
npm init -y
npm install -D vite prettier husky
npm install react react-dom
npx husky init
npm pkg set scripts.test="prettier --check ."
npm pkg set scripts.dev="vite"
```

## Set up React

Minimal `index.html`

```html
<html lang="en">
  <body>
    <div id="root"></div>
  </body>
  <script src="src/main.jsx" type="module"></script>
</html>
```

Minimal `src/main/jsx`:

```jsx
import { createRoot } from "react-dom/client";
createRoot(document.getElementById("app")).render(<h1>Hello World</h1>);
```

## Using JavaScript objects in React

```jsx
export function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map((t) => (
        <li>{t.description}</li>
      ))}
    </ul>
  );
}
```

## Updating state in React

```jsx
export function NewTaskForm({ setTasks }) {
  const [description, setDescription] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setTasks((old) => [...old, { description }]);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Description:{" "}
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <button>Save {description}</button>
      </div>
    </form>
  );
}
```

## Using TypeScript to check parameters

```tsx
export function TaskList({
  tasks,
  onUpdateTask,
}: {
  tasks: TaskItem[];
  onUpdateTask(id: number, delta: Partial<TaskItem>): void;
}) {
  return (
    <ul>
      {tasks.map((t) => (
        <li>
          <input
            type={"checkbox"}
            checked={t.completed}
            onChange={(e) =>
              onUpdateTask(t.id, { completed: e.target.checked })
            }
          />{" "}
          {t.description}
        </li>
      ))}
    </ul>
  );
}
```

### Deployment to GitHub pages

```yaml
on:
  push:
    branches:
      - main
      - lecture/*
      - reference/*

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: "22.x"
      - run: npm ci
      - run: npm test
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist
      - uses: actions/deploy-pages@v4

    permissions:
      id-token: write
      pages: write
      contents: read
```
