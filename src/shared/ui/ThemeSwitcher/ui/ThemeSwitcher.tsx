import { classNames } from "shared/lib/classNames/classNames";
import { Moon } from "lucide-react";
import { useTheme } from "app/providers/theme";
import cls from "./ThemeSwitcher.module.scss";

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { toggleTheme } = useTheme();

  return (
    <button className={classNames(cls.ThemeSwitcher, {}, [className])} onClick={toggleTheme}>
      <Moon />
    </button>
  );
};
