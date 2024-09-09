import React, { useEffect, useState } from "react";
import style from '../../CSS/Room/MainContent.module.css'
import Announcement from "../Announcement/Announcement";
import Members from "../Members/Members";
import Chatroom from "../chatroom/Chat";
import { useNavigate } from "react-router-dom";

const MainContent = ():React.JSX.Element => {
    const navigate= useNavigate();
    const [option, setOption] = useState<'announcement' | 'members' | 'discussion' | null>('announcement');
    const handleOptionChange = (e: React.MouseEvent, prop: 'announcement' | 'members' | 'discussion' | null) => {
        setOption(prop);
    }

    useEffect(() => {
        if (localStorage.getItem('auth-token-workspace') === null || undefined) {
            navigate('/auth');
        }
        //eslint-disable-next-line
    }, [])


    return (
        <div className={style.room_container}>
            <div>
                <div className={style.room_header}>
                    <div className={`${style.rooms_header_button} ${option === 'announcement' ? style.button_active : ''} `} onClick={(e) => { e.preventDefault(); handleOptionChange(e, 'announcement') }}>Announcement</div>
                    <div className={`${style.rooms_header_button} ${option === 'members' ? style.button_active : ''}`} onClick={(e) => { e.preventDefault(); handleOptionChange(e, 'members') }}>Members</div>
                    <div className={`${style.rooms_header_button} ${option === 'discussion' ? style.button_active : ''}`} onClick={(e) => { e.preventDefault(); handleOptionChange(e, 'discussion') }}>chatroom</div>
                </div>
            </div>

            <div className={style.room_main}>
                {option === 'announcement' && <Announcement />}
                {option === 'members' && <Members />}
                {option === 'discussion' && <Chatroom />}
            </div>
        </div>
    )
}
export default MainContent;