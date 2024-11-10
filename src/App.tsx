import { Header } from "@/components/layout/Header";
import { BaseLayout } from "@/components/layout/BaseLayout";
import { useEffect } from "react";
import { useTasks } from "@/hooks/useTasks";
import { CreateTaskDialog } from "@/components/tasks/CreateTaskDialog";
import { TaskList } from "@/components/tasks/TaskList";
import { Task, UpdateTaskInput } from "@/types/task";

function App() {
  const {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  } = useTasks();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleStatusChange = async (id: string, status: Task["status"]) => {
    await updateTask(id, { status });
  };

  const handleCreateTask = async (data: CreateTaskInput) => {
    await createTask(data);
  };

  const handleEditTask = async (id: string, data: UpdateTaskInput) => {
    await updateTask(id, data);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BaseLayout>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">Minhas Tarefas</h2>
          <CreateTaskDialog onCreateTask={handleCreateTask} />
        </div>

        <div className="space-y-4">
          {loading && (
            <div className="flex items-center justify-center p-4">
              <p className="text-muted-foreground">Carregando tarefas...</p>
            </div>
          )}

          {error && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && tasks.length === 0 && (
            <div className="text-center p-8 bg-muted rounded-lg">
              <p className="text-muted-foreground">
                Nenhuma tarefa encontrada. Crie uma nova tarefa para começar!
              </p>
            </div>
          )}

          {tasks.length > 0 && (
            <TaskList
              tasks={tasks}
              onStatusChange={handleStatusChange}
              onEdit={handleEditTask}
              onDelete={deleteTask}
            />
          )}
        </div>
      </BaseLayout>
    </div>
  );
}

export default App;
