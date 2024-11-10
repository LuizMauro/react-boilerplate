import { CreateTaskDialog } from "./dialogs";

export function TaskHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-foreground">Minhas Tarefas</h2>
      <CreateTaskDialog />
    </div>
  );
}
