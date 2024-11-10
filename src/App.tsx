import { Header } from "@/components/layout/Header";
import { BaseLayout } from "@/components/layout/BaseLayout";
import { useEffect } from "react";
import { useTasks } from "@/hooks/useTasks";

function App() {
  const { tasks, loading, error, fetchTasks } = useTasks();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BaseLayout>
        {loading && <p>Carregando...</p>}
        {error && <p>Erro: {error}</p>}
        <pre>{JSON.stringify(tasks, null, 2)}</pre>
      </BaseLayout>
    </div>
  );
}

export default App;
