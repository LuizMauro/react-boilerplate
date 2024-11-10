interface TaskErrorProps {
  message: string;
}

export function TaskError({ message }: TaskErrorProps) {
  return (
    <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
      <p>{message}</p>
    </div>
  );
}
