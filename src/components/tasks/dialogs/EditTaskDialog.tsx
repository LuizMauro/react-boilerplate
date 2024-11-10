import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EditTaskForm } from "../form";
import { Task, UpdateTaskInput } from "@/types/task";
import { useState } from "react";
import { Pencil } from "lucide-react";

interface EditTaskDialogProps {
  task: Task;
  onEditTask: (id: string, data: UpdateTaskInput) => Promise<void>;
}

export function EditTaskDialog({ task, onEditTask }: EditTaskDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: UpdateTaskInput) => {
    await onEditTask(task.id, data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>
        </DialogHeader>
        <EditTaskForm
          task={task}
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
