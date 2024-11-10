import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/theme-provider";
import { Moon, Sun } from "lucide-react";
import { Breadcrumb } from "./Breadcrumb";

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Breadcrumb />
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
          <span className="sr-only">Alternar tema</span>
        </Button>
      </div>
    </header>
  );
}
