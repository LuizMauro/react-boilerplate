import { Header } from "@/components/layout/Header";
import { BaseLayout } from "@/components/layout/BaseLayout";
import { TaskList } from "@/components/tasks/list";
import { TaskFilters } from "@/components/tasks/TaskFilters";
import { TaskHeader } from "@/components/tasks/TaskHeader";
import { TaskStats } from "@/components/tasks/TaskStats";
import {
  TaskEmptyState,
  TaskLoadingState,
  TaskError,
} from "@/components/tasks/states";
import { useTaskContext } from "@/context/task-context";

function App() {
  const { tasks, loading, error } = useTaskContext();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BaseLayout>
        <TaskHeader />
        <TaskStats />
        <div className="mt-6">
          <TaskFilters />
        </div>
        <div className="mt-6">
          {loading && <TaskLoadingState />}
          {error && <TaskError message={error} />}
          {!loading && !error && tasks.length === 0 && <TaskEmptyState />}
          {tasks.length > 0 && <TaskList />}
        </div>
      </BaseLayout>
    </div>
  );
}

export default App;
