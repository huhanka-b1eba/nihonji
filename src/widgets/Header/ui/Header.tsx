import {Link} from "react-router";
import styles from './Header.module.scss';
import {Bookmark, Moon} from "lucide-react";


const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.headerInner}>

                <div className={styles.left}>
                    <Link to="/" className={styles.logo}>Nihonji</Link>
                </div>

                <div className={styles.center}>
                    <input type="text" className={styles.search} placeholder="Поиск..." />
                </div>

                <div className={styles.right}>
                    <div className={styles.links}>
                        <Link to="/novelty" className={styles.navLink}>Онгоинги</Link>
                        <Link to="/popular" className={styles.navLink}>Популярное</Link>
                        <Link to="/catalog" className={styles.navLink}>Каталог</Link>
                    </div>
                    <div className={styles.toggles}>
                        <Link to="/catalog" className={styles.toggleTheme}><Bookmark /></Link>
                        <button className={styles.toggleLang}>RU</button>
                        <button className={styles.toggleTheme}>
                            <Moon />
                        </button>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Header;