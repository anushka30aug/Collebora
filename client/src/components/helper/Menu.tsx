import { Archive, Calendar, Home } from "./icons";
import style from '../../CSS/Menu.module.css';
import { useAppSelector } from "../../states/Hooks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../states/Store";
import { editShowMenu, setIsActive, setMenuOption } from "../../states/UserInterface"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Menu = (): React.JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate=useNavigate()
    const showMenu = useAppSelector(state => state.userInterface.showMenu)
    const option = useAppSelector(state=>state.userInterface.menuOption)
    return (
        <div className={style.menu_container}>
            <div className={style.menu_icons} onMouseOver={() => { dispatch(editShowMenu(true))}}>
                <div className={`${style.icons} ${option==='home'?style.activeOption:''}`} onClick={()=>dispatch(setMenuOption('home'))}>
                    <Home />
                </div>
                <div className={`${style.icons} ${option==='calendar'?style.activeOption:''}`} onClick={()=>dispatch(setMenuOption('calendar'))}>
                    <Calendar />
                </div>
                <div className={`${style.icons} ${option==='archive'?style.activeOption:''}`} onClick={()=>dispatch(setMenuOption('archive'))}>
                    <Archive />
                </div>
            </div>
            <div className={style.menu_options} style={{ display: showMenu ? 'flex' : 'none' }} >
                <div className={`${style.options} ${option==='home'?style.activeOption:''}`} onClick={(e)=>{dispatch(setIsActive(true)) ; dispatch(setMenuOption('home')); navigate('/')}}>
                    Home
                </div>
                <div className={`${style.options} ${option==='calendar'?style.activeOption:''}`} onClick={()=>dispatch(setMenuOption('calendar'))}>
                    Calendar
                </div>
                <div className={`${style.options} ${option==='archive'?style.activeOption:''}`} onClick={(e)=>{dispatch(setIsActive(false)) ; dispatch(setMenuOption('archive'));  navigate('/')}}>
                    Archived Rooms
                </div>
            </div>
        </div>
    )
}

export default Menu;