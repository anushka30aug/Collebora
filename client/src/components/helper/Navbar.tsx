import { Add, Hamburger } from "./icons";
import style from '../../CSS/Navbar.module.css';
import { useAppSelector } from "../../states/Hooks";
import img from '../helper/image.png';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../states/Store";
import { editShowCreateModal, editShowMenu } from "../../states/UserInterface";
import { useNavigate } from "react-router-dom";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const Navbar = (): React.JSX.Element => {
    const image = useAppSelector(state => state.user.profilePicture);
    const menu = useAppSelector(state=>state.userInterface.showMenu)
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const name = useAppSelector(state=>state.user.name);
    const email = useAppSelector(state=>state.user.emailAddress);

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);


    
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
                <div className={style.nav_right_account} onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}>
                    <img src={image? image : img} alt="" />
                </div>
                <Popover
                    id="mouse-over-popover"
                    sx={{
                        pointerEvents: 'none',
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                >
                    <Typography sx={{ p: 1 }}>{name}</Typography>
                    <Typography sx={{ p: 1 }}>{email}</Typography>
                </Popover>

            </div>
        </div>
    )
}
export default Navbar;