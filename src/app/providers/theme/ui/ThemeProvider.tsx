
import {classNames} from "shared/lib/classNames/classNames";
import cls from './ThemeProvider.module.scss';


interface ThemeProviderProps {
    className?: string;
}


export const ThemeProvider = ({className}: ThemeProviderProps) => {
    return (
        <div className={classNames(cls.ThemeProvider, {}, [className])}>

        </div>
    );
};

