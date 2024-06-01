import React, { useState } from "react";
import style from '../../CSS/Room/MainContent.module.css'
import Announcement from "../Announcement/Announcement";
import { useAppSelector } from "../../states/Hooks";
import CreateRoom from "./CreateRoom";
import Members from "../Members/Members";
import Chatroom from "../chatroom/Chat";

const MainContent = ():React.JSX.Element => {
    const isModal = useAppSelector(state => state.userInterface.showCreateModal);
    const [option, setOption] = useState<'announcement' | 'members' | 'discussion' | null>('announcement');

    const handleOptionChange = (e: React.MouseEvent, prop: 'announcement' | 'members' | 'discussion' | null) => {
        setOption(prop);
    }

    return (
        <div className={style.room_container}>
            {isModal && <CreateRoom />}
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