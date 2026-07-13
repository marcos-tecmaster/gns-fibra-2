import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/theme/theme";

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const label = isDark ? "Ativar tema claro" : "Ativar tema escuro";
  const Icon = isDark ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-card/80 text-foreground transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      aria-label={label}
      title={label}
      aria-pressed={!isDark}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </button>
  );
}
