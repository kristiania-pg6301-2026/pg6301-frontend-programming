export interface TaskItem {
  id: number;
  completed: boolean;
  description: string;
  details?: string;
}

export type OnUpdateTask = (id: number, delta: Partial<TaskItem>) => void;
export type OnNewTask = (task: Omit<TaskItem, "id">) => void;
