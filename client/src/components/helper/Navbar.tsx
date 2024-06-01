import { Add, Hamburger } from "./icons";
import style from '../../CSS/Navbar.module.css';
import { useAppSelector } from "../../states/Hooks";
import img from '../helper/image.png';
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../states/Store";
import { editShowCreateModal, editShowMenu } from "../../states/UserInterface";
import { useNavigate } from "react-router-dom";

const Navbar = (): React.JSX.Element => {
    const image = useAppSelector(state => state.user.profilePicture);
    const menu = useAppSelector(state=>state.userInterface.showMenu)
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const showMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(editShowMenu(!menu));
    }

    return (
        <div className={style.nav_container}>
            <div className={style.nav_left}>
                <div className={style.nav_left_menu} onClick={showMenu}>
                    <Hamburger />
                </div>
                <div className={style.nav_left_logo}>
                    <h3><b>COLLEBORA</b></h3>
                </div>
            </div>
            <div className={style.nav_right}>
                <div className={style.nav_right_addClass} title="Add or join Room">
                    <span><Add/></span>
                    <div className={style.nav_right_dropdown_content}>
                        <p onClick={()=>{dispatch(editShowCreateModal())}}>Create Room</p>
                        <p onClick={()=>{navigate('/joinRoom')}}>Join Room</p>
                    </div>
                </div>
                <div className={style.nav_right_account}>
                    <img src={image !== null ? image : img} alt="" />
                </div>
            </div>
        </div>
    )
}
export default Navbar;