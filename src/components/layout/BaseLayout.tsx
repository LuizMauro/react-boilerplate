import { cn } from "@/lib/utils";
import { Sidebar } from "./Sidebar";

interface BaseLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function BaseLayout({ children, className }: BaseLayoutProps) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className={cn("flex-1 overflow-y-auto", className)}>
        <div className="container mx-auto px-4 py-8">{children}</div>
      </main>
    </div>
  );
}
