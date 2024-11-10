import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function TaskTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[3px]"></TableHead>
        <TableHead>Título</TableHead>
        <TableHead>Prioridade</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Prazo</TableHead>
        <TableHead className="w-[100px]">Ações</TableHead>
      </TableRow>
    </TableHeader>
  );
}
