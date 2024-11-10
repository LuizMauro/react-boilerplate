import { Table, TableBody } from "@/components/ui/table";
import { useTaskContext } from "@/context/task-context";
import { Task, UpdateTaskInput } from "@/types/task";
import { TaskTableHeader } from "./TaskTableHeader";
import { TaskTableRow } from "./TaskTableRow";

export function TaskList() {
  const { tasks, updateTask, deleteTask } = useTaskContext();

  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleStatusChange = async (task: Task, status: Task["status"]) => {
    await updateTask(task.id, { status });
  };

  const handleEdit = async (id: string, data: UpdateTaskInput) => {
    await updateTask(id, data);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TaskTableHeader />
        <TableBody>
          {sortedTasks.map((task) => (
            <TaskTableRow
              key={task.id}
              task={task}
              onStatusChange={handleStatusChange}
              onEdit={handleEdit}
              onDelete={deleteTask}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
