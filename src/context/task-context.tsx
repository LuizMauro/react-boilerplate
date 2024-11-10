import { createContext, useContext, ReactNode } from "react";
import { Task, CreateTaskInput, UpdateTaskInput } from "@/types/task";
import { useTasks } from "@/hooks/useTasks";

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  createTask: (data: CreateTaskInput) => Promise<Task>;
  updateTask: (id: string, data: UpdateTaskInput) => Promise<Task>;
  deleteTask: (id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const { tasks, loading, error, createTask, updateTask, deleteTask } =
    useTasks();

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
}
