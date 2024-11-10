import { useSearchParams } from "react-router-dom";
import { TaskPriority, TaskStatus } from "@/types/task";

interface TaskFilters {
  search: string;
  status: TaskStatus | "all";
  priority: TaskPriority | "all";
}

export function useTaskFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: TaskFilters = {
    search: searchParams.get("search") || "",
    status: (searchParams.get("status") as TaskStatus | "all") || "all",
    priority: (searchParams.get("priority") as TaskPriority | "all") || "all",
  };

  const setFilters = (newFilters: TaskFilters) => {
    const params = new URLSearchParams();
    if (newFilters.search) params.set("search", newFilters.search);
    if (newFilters.status !== "all") params.set("status", newFilters.status);
    if (newFilters.priority !== "all")
      params.set("priority", newFilters.priority);
    setSearchParams(params);
  };

  return { filters, setFilters };
}
