import { createContext, useContext, ReactNode } from "react";
import { Task, CreateTaskInput, UpdateTaskInput } from "@/types/task";
import { useTasks } from "@/hooks/useTasks";
import { useTaskFilters } from "@/hooks/useTaskFilters";

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filters: ReturnType<typeof useTaskFilters>["filters"];
  setFilters: ReturnType<typeof useTaskFilters>["setFilters"];
  createTask: (data: CreateTaskInput) => Promise<Task>;
  updateTask: (id: string, data: UpdateTaskInput) => Promise<Task>;
  deleteTask: (id: string) => Promise<string>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const { tasks, loading, error, createTask, updateTask, deleteTask } =
    useTasks();
  const { filters, setFilters } = useTaskFilters();

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.description?.toLowerCase().includes(filters.search.toLowerCase());

    const matchesStatus =
      filters.status === "all" || task.status === filters.status;
    const matchesPriority =
      filters.priority === "all" || task.priority === filters.priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <TaskContext.Provider
      value={{
        tasks: filteredTasks,
        loading,
        error,
        filters,
        setFilters,
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
