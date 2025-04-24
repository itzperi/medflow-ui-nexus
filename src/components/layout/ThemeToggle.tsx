import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [checked, setChecked] = useState(false);
  
  useEffect(() => {
    setChecked(theme === "dark");
  }, [theme]);
  
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setChecked(newTheme === "dark");
  };

  return (
    <div className="flex items-center gap-2 rounded-full bg-secondary px-2 py-1">
      <Sun className="h-4 w-4 text-amber-500" />
      <Switch 
        checked={checked} 
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-slate-800"
      />
      <Moon className="h-4 w-4 text-indigo-500" />
    </div>
  );
}
