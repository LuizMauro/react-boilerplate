import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/theme-provider";
import { useAuth } from "@/context/auth-context";
import { Moon, Sun, LogOut } from "lucide-react";
import { Breadcrumb } from "./Breadcrumb";

export function Header() {
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Breadcrumb />
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Olá, {user?.name}
          </span>
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
          </Button>
          <Button variant="ghost" size="icon" onClick={signOut}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
