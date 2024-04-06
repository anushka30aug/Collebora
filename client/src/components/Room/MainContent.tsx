import React, { useState } from "react";
import style from '../../CSS/Room/MainContent.module.css'
import Announcement from "../Announcement/Announcement";
import { useAppSelector } from "../../states/Hooks";
import CreateRoom from "./CreateRoom";
import Members from "../Members/Members";


const MainContent = ():React.JSX.Element=>{
    const isModal = useAppSelector(state => state.userInterface.showCreateModal);
    const classRoom =useAppSelector(state=>state.userInterface.classroomDetail);
    console.log(classRoom)
    const [option,setOption]=useState<'announcement'|'members'|'discussion'|null>('announcement');
    const handleOptionChange=(e:React.MouseEvent,prop:'announcement'|'members'|'discussion'|null)=>{
        setOption(prop);
    }
    return(
        <div className={style.room_container}>
             {isModal && <CreateRoom/>}
            <div className={style.room_header}>
             {/* <div className={style.header_content}> */}
                <button className={`${style.rooms_header_button} ${option==='announcement'?style.button_active:''} `} onClick={(e) => {e.preventDefault(); handleOptionChange(e, 'announcement') }}>Announcement</button>
                <button className={`${style.rooms_header_button} ${option==='members'?style.button_active:''}`} onClick={(e) =>{e.preventDefault(); handleOptionChange(e, 'members')}}>Members</button>
                <button className={`${style.rooms_header_button} ${option==='members'?style.button_active:''}`} onClick={(e) =>{e.preventDefault(); handleOptionChange(e, 'members')}}>cc</button>
                <button className={`${style.rooms_header_button} ${option==='members'?style.button_active:''}`} onClick={(e) =>{e.preventDefault(); handleOptionChange(e, 'members')}}>vvffvd</button>
            {/* </div> */}
            </div>
           
            <div className={style.room_main}>
            {option==='announcement'&& <Announcement/>}
            {option==='members'&& <Members/>}
            </div>
        </div>
    )
}
export default MainContent;