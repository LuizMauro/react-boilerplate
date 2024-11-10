import { TaskList } from "@/components/tasks/list";
import { TaskFilters } from "@/components/tasks/TaskFilters";
import { TaskHeader } from "@/components/tasks/TaskHeader";
import {
  TaskEmptyState,
  TaskLoadingState,
  TaskError,
} from "@/components/tasks/states";
import { useTaskContext } from "@/context/task-context";

export default function TasksPage() {
  const { tasks, loading, error } = useTaskContext();

  return (
    <div className="space-y-6">
      <TaskHeader />
      <TaskFilters />
      <div className="mt-6">
        {loading && <TaskLoadingState />}
        {error && <TaskError message={error} />}
        {!loading && !error && tasks.length === 0 && <TaskEmptyState />}
        {tasks.length > 0 && <TaskList />}
      </div>
    </div>
  );
}
