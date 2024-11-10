interface TaskTitleProps {
  title: string;
  description?: string;
}

export function TaskTitle({ title, description }: TaskTitleProps) {
  return (
    <div className="flex flex-col">
      <span className="font-medium">{title}</span>
      {description && (
        <span className="text-sm text-muted-foreground line-clamp-1">
          {description}
        </span>
      )}
    </div>
  );
}
