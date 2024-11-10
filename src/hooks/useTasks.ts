import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Task, UpdateTaskInput } from "@/types/task";
import { tasksApi } from "@/lib/api/tasks";

export function useTasks() {
  const queryClient = useQueryClient();

  const {
    data: tasks = [],
    isLoading: loading,
    error,
  } = useQuery<Task[], Error>({
    queryKey: ["tasks"],
    queryFn: tasksApi.getTasks,
  });

  const createTaskMutation = useMutation({
    mutationFn: tasksApi.createTask,
    onSuccess: (newTask) => {
      queryClient.setQueryData<Task[]>(["tasks"], (old = []) => [
        ...old,
        newTask,
      ]);
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskInput }) =>
      tasksApi.updateTask(id, data),
    onSuccess: (updatedTask) => {
      queryClient.setQueryData<Task[]>(["tasks"], (old = []) =>
        old.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: tasksApi.deleteTask,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<Task[]>(["tasks"], (old = []) =>
        old.filter((task) => task.id !== deletedId)
      );
    },
  });

  return {
    tasks,
    loading,
    error: error?.message || null,
    createTask: createTaskMutation.mutateAsync,
    updateTask: (id: string, data: UpdateTaskInput) =>
      updateTaskMutation.mutateAsync({ id, data }),
    deleteTask: deleteTaskMutation.mutateAsync,
  };
}
