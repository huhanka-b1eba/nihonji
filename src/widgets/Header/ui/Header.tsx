import {Link} from "react-router";

const Header = () => {
    return (
        <div>
            <Link to="/">Главная</Link>
            <Link to="/catalog">Каталог</Link>
        </div>
    )
}

export default Header;