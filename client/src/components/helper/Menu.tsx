import { Archive, Calendar, Home } from "./icons";
import style from '../../CSS/Menu.module.css';
import { useAppSelector } from "../../states/Hooks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../states/Store";
import { editShowMenu } from "../../states/UserInterface";

const Menu = (): React.JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
    const showMenu = useAppSelector(state => state.userInterface.showMenu)

    return (
        <div className={style.menu_container}>
            <div className={style.menu_icons} onMouseOver={() => { dispatch(editShowMenu(true)) }} onMouseLeave={() => { dispatch(editShowMenu(false)) }}>
                <div className={style.icons}>
                    <Home />
                </div>
                <div className={style.icons}>
                    <Calendar />
                </div>
                <div className={style.icons}>
                    <Archive />
                </div>
            </div>
            <div className={style.menu_options} style={{ display: showMenu ? 'flex' : 'none' }} >
                <div className={style.options}>
                    Home
                </div>
                <div className={style.options}>
                    Calendar
                </div>
                <div className={style.options}>
                    Archived Rooms
                </div>
            </div>
        </div>
    )
}

export default Menu;