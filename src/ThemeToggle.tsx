import { Moon, Sun, Laptop, Check } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const options = [
    { key: "light", label: "Light", icon: Sun },
    { key: "dark", label: "Dark", icon: Moon },
    { key: "system", label: "System", icon: Laptop },
  ] as const;

  return (
    <div
      role="radiogroup"
      aria-label="Theme selection"
      className="
        inline-flex items-center
        rounded-full
        border border-border/70
        bg-muted/50
        p-1
        shadow-sm
      "
    >
      {options.map(({ key, label, icon: Icon }) => {
        const isActive = theme === key;

        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={label}
            title={label}
            onClick={() => setTheme(key)}
            className={cn(
              "relative flex h-8 w-8 items-center justify-center",
              "rounded-full transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:bg-background/70 hover:text-foreground",
            )}
          >
            <Icon className="h-4 w-4" />

            {isActive && (
              <span className="sr-only">Current theme: {label}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
