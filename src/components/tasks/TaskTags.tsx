import { Badge } from "@/components/ui/badge";

interface TaskTagsProps {
  tags: string[];
}

export function TaskTags({ tags }: TaskTagsProps) {
  if (!tags?.length) return null;

  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {tags.map((tag) => (
        <Badge key={tag} variant="secondary" className="text-xs">
          {tag}
        </Badge>
      ))}
    </div>
  );
}
