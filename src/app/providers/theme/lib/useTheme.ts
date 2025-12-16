import {
  LOCALE_STORAGE_THEME_KEY,
  type Theme,
  ThemeContext,
} from "app/providers/theme/lib/ThemeContext.ts";
import { useContext } from "react";

interface UseThemeResult {
  theme: Theme;
  toggleTheme: () => void;
}

export const useTheme = (): UseThemeResult => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  const { theme, setTheme } = context;

  const toggleTheme = () => {
    const newTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem(LOCALE_STORAGE_THEME_KEY, newTheme);
  };

  return {
    theme,
    toggleTheme,
  };
};
