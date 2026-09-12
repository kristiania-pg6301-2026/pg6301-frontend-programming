# Lecture 5: useRef, useRef and useContext

We will expand on the code, exploring more React hooks

## useEffect and useRef hooks

```tsx
export default function Dialog() {
  // a ref creates a variable that can be used to execute functions on the HTML element on the page
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  // useEffect with `[]` calls the provided code once. In this case, binding the HTML event "close" to call a function
  useEffect(() => {
    dialogRef.current!.addEventListener("close", () => onClose());
  }, []);

  // useEffect with `[dependencies]` calls the provided code every time the dependencies change their state
  // - in this case, we call `showModal` or `close` on the HTML dialog element
  useEffect(() => {
    if (isOpen) dialogRef.current!.showModal();
    else dialogRef.current!.close();
  }, [isOpen]);
  return <dialog ref={dialogRef}>{children}</dialog>;
}
```

## React.createContext and useContext

Context variables provide state that can be accessed anywhere in the scope of the context.
This reduces the need for "props drilling".

```tsx
// defines a React context. The parameter to the method call is the default value of
// the context variables
export const TaskListContext = React.createContext<{ tasks: TaskItem[] }>({
  tasks: [],
});

function Application() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  // constructs the context around the child elements, where the value can be used
  return (
    <TaskListContext value={{ tasks }}>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/tasks/:id"} element={<TaskPage />} />
        <Route path={"*"} element={<h1>Page not found</h1>} />
      </Routes>
    </TaskListContext>
  );
}

// The context variables can be used in components within scope
function TaskList() {
  const { tasks } = useContext(TaskListContext);
  return (
    <ul>
      {tasks.map((t) => (
        <li>{t.description}</li>
      ))}
    </ul>
  );
}
```
