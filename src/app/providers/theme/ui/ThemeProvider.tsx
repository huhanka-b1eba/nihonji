import {type FC, type ReactNode, useMemo, useState} from "react";
import {LOCALE_STORAGE_THEME_KEY, ThemeContext} from "../lib/ThemeContext";
import type {Theme} from "../lib/ThemeContext";

interface ThemeProviderProps {
    children?: ReactNode;
}

const defaultTheme: Theme = localStorage.getItem(LOCALE_STORAGE_THEME_KEY) as Theme || 'light';

export const ThemeProvider: FC<ThemeProviderProps> = ({children}) => {
    const [theme, setTheme] = useState(defaultTheme);

    const defaultProps = useMemo(() => ({
        theme,
        setTheme
    }), [theme]);


    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

