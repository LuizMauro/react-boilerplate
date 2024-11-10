import { BaseLayout } from "@/components/layout/BaseLayout";
import { Outlet } from "react-router-dom";
import { TaskProvider } from "@/context/task-context";

export function App() {
  return (
    <TaskProvider>
      <BaseLayout>
        <Outlet />
      </BaseLayout>
    </TaskProvider>
  );
}
