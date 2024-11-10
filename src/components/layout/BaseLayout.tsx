import { ReactNode } from "react";

interface BaseLayoutProps {
  children: ReactNode;
}

export function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid gap-6">{children}</div>
    </main>
  );
}
