export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  tags?: string[];
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  priority: TaskPriority;
  status?: TaskStatus;
  dueDate?: Date;
  tags?: string[];
}

export interface UpdateTaskInput extends Partial<CreateTaskInput> {
  status?: TaskStatus;
}
