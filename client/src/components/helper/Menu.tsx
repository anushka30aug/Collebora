import { Archive, Home, Logout } from "./icons";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import style from '../../CSS/Menu.module.css';
import { useAppSelector } from "../../states/Hooks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../states/Store";
import { editShowMenu, setIsActive, setMenuOption } from "../../states/UserInterface";
import img from '../helper/image.png';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Menu = (): React.JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const showMenu = useAppSelector(state => state.userInterface.showMenu);
    const option = useAppSelector(state => state.userInterface.menuOption);
    const image = useAppSelector(state => state.user.profilePicture);
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


    const archiveClick = (e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(setIsActive(false));
        dispatch(setMenuOption('archive'));
        navigate('/')
    }

    const homeClick = (e: React.MouseEvent) => {
        e.preventDefault()
        dispatch(setIsActive(true))
        dispatch(setMenuOption('home'))
        navigate('/')
    }

    const logoutClick=(e:React.MouseEvent)=>{
        e.preventDefault()
        dispatch(setMenuOption('Logout'))
    }


    return (
        <div className={style.menu_container} onMouseOver={() => { dispatch(editShowMenu(true)) }} style={{ display: showMenu ? 'flex' : '' }}>
            <div className={style.menu_icons} >
                <div className={`${style.icons} ${option === 'home' ? style.activeOption : ''}`} onClick={homeClick}>
                    <Home />
                </div>
              
                <div className={`${style.icons} ${option === 'archive' ? style.activeOption : ''}`} onClick={archiveClick}>
                    <Archive />
                </div>
                <div className={`${style.icons} ${option === 'Account' ? style.activeOption : ''} ${style.accountIcon}`}>
                    <img src={image !== null ? image : img} alt="" />
                </div>
                <div className={`${style.icons} ${option === 'Logout' ? style.activeOption : ''}`} onClick={ logoutClick}>
                    <Logout />
                </div>
            </div>
            <div className={style.menu_options} style={{ display: showMenu ? 'flex' : 'none' }} >
                <div className={`${style.options} ${option === 'home' ? style.activeOption : ''}`} onClick={homeClick}>
                    Home
                </div>
                <div className={`${style.options} ${option === 'archive' ? style.activeOption : ''}`} onClick={archiveClick}>
                    Archived Rooms
                </div>
                <div className={`${style.options} ${option === 'Account' ? style.activeOption : ''} ${style.accountOption}`} onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}>
                    Account
                </div>
                <div className={`${style.options} ${option === 'Logout' ? style.activeOption : ''} `} onClick={ logoutClick}>
                    Logout
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

export default Menu;