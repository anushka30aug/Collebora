import { Archive, Calendar, Home } from "./icons";
import style from '../../CSS/Menu.module.css';
import { useAppSelector } from "../../states/Hooks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../states/Store";
import { editShowMenu, setIsActive, setMenuOption } from "../../states/UserInterface"; 
import img from '../helper/image.png';
// import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Menu = (): React.JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate=useNavigate()
    const showMenu = useAppSelector(state => state.userInterface.showMenu)
    const option = useAppSelector(state=>state.userInterface.menuOption)
    const image = useAppSelector(state => state.user.profilePicture);

    const archiveClick=(e:React.MouseEvent)=>{
        e.preventDefault();
        dispatch(setIsActive(false));
        dispatch(setMenuOption('archive'));
        navigate('/')
    }

    const homeClick=(e:React.MouseEvent)=>{
        e.preventDefault()
        dispatch(setIsActive(true))
        dispatch(setMenuOption('home'))
        navigate('/')
    }

    const calendarClick=(e:React.MouseEvent)=>{
        e.preventDefault()
        dispatch(setMenuOption('calendar'))
        navigate('/')
    }

    const accountClick=(e:React.MouseEvent)=>{
        e.preventDefault();
        dispatch(setMenuOption('Account'));
    }

    return (
        <div className={style.menu_container} onMouseOver={() => { dispatch(editShowMenu(true))}} onMouseLeave={()=>{dispatch(editShowMenu(false))}}>
            <div className={style.menu_icons} >
                <div className={`${style.icons} ${option==='home'?style.activeOption:''}`} onClick={homeClick}>
                    <Home />
                </div>
                <div className={`${style.icons} ${option==='calendar'?style.activeOption:''}`} onClick={calendarClick}>
                    <Calendar />
                </div>
                <div className={`${style.icons} ${option==='archive'?style.activeOption:''}`} onClick={archiveClick}>
                    <Archive />
                </div>
                <div className={`${style.icons} ${option==='Account'?style.activeOption:''} ${style.accountIcon}`} onClick={accountClick}>
                    <img src={image !== null ? image : img} alt="" />
                </div>
            </div>
            <div className={style.menu_options} style={{ display: showMenu ? 'flex' : 'none' }} >
                <div className={`${style.options} ${option==='home'?style.activeOption:''}`} onClick={homeClick}>
                    Home
                </div>
                <div className={`${style.options} ${option==='calendar'?style.activeOption:''}`} onClick={calendarClick}>
                    Calendar
                </div>
                <div className={`${style.options} ${option==='archive'?style.activeOption:''}`} onClick={archiveClick}>
                    Archived Rooms
                </div>
                <div className={`${style.options} ${option==='Account'?style.activeOption:''} ${style.accountOption}`} onClick={accountClick}>
                    Account
                </div>

            </div>
        </div>
    )
}

export default Menu;