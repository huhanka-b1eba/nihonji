import cls from './Footer.module.scss';
import { classNames } from "../../../shared/lib/classNames/classNames";

interface FooterProps {
    className?: string;
}

export const Footer = ({ className }: FooterProps) => {
    return (
        <footer className={classNames(cls.Footer, {}, [className])}>
            <div className="container">
                <div className={cls.footerInner}>
                    <div className={cls.about}>
                        <h3 className={cls.logo}>Nihonji</h3>
                        <p className={cls.desc}>
                            Аниме-гид для каждого дня. Лучшие подборки, новинки и рекомендации.
                        </p>
                    </div>

                    <nav className={cls.nav}>
                        <a href="/">Главная</a>
                        <a href="/catalog">Каталог</a>
                        <a href="/selections">Подборки</a>
                        <a href="/about">О нас</a>
                    </nav>

                    <div className={cls.socials}>
                        <a href="#" aria-label="YouTube">YouTube</a>
                        <a href="#" aria-label="Telegram">Telegram</a>
                        <a href="#" aria-label="VK">VK</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
