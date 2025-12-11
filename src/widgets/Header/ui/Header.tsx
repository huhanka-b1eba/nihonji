import {Link} from "react-router";
import cls from './Header.module.scss';
import {Bookmark, Minimize, Moon, Search} from "lucide-react";


const Header = () => {
    return (
        <div className={cls.header}>
            <div className={cls.headerInner}>

                <div>
                    <div className={cls.left}>
                        <Link to="/" className={cls.logo}>Nihonji</Link>
                        <div className={cls.links}>
                            <Link to="/novelty" className={cls.navLink}>Онгоинги</Link>
                            <Link to="/popular" className={cls.navLink}>Популярное</Link>
                            <Link to="/catalog" className={cls.navLink}>Каталог</Link>
                        </div>
                    </div>
                </div>
                <div className={cls.right}>
                    <div className={cls.toggles}>
                        <Link to="/search" className={cls.toggleTheme}><Search /></Link>
                        <Link to="/catalog" className={cls.toggleTheme}><Bookmark /></Link>
                        <button className={cls.toggleLang}>RU</button>
                        <button className={cls.toggleTheme}>
                            <Moon />
                        </button>
                    </div>
                    <div className={cls.userAvatar}>
                        <Minimize />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Header;