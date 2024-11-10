import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreateTaskForm } from "./CreateTaskForm";
import { CreateTaskInput } from "@/types/task";
import { useState } from "react";

interface CreateTaskDialogProps {
  onCreateTask: (data: CreateTaskInput) => Promise<void>;
}

export function CreateTaskDialog({ onCreateTask }: CreateTaskDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: CreateTaskInput) => {
    await onCreateTask(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Nova Tarefa</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Nova Tarefa</DialogTitle>
        </DialogHeader>
        <CreateTaskForm
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
