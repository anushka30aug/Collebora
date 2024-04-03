import React, { useState } from "react";
import style from '../../CSS/Room/MainContent.module.css'
import Announcement from "../Announcement/Announcement";
import { useAppSelector } from "../../states/Hooks";
import CreateRoom from "./CreateRoom";
import { Copy } from "../helper/icons";
import toast from "react-hot-toast";

const MainContent = ():React.JSX.Element=>{
    const isModal = useAppSelector(state => state.userInterface.showCreateModal);
    const className=useAppSelector(state=>state.userInterface.classroomDetail?.name);
    const classId = useAppSelector(state=>state.userInterface.classroomDetail?.classId);
    const classRoom =useAppSelector(state=>state.userInterface.classroomDetail);
    const isAdmin = useAppSelector(state=>state.userInterface.isAdmin)
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
            <div className={style.intro}>
                <div className={style.intro_name}>
                {className}
                </div>
                {
                    isAdmin && <div className={style.intro_id}>
                    <span>{classId}</span>
                    <button onClick={(e:React.MouseEvent)=>{
                        e.preventDefault();
                        navigator.clipboard.writeText(`${classId}`)
                        toast.success('copied')
                    }}>
                    <Copy/>
                    </button>
                    </div>
                }
                
            </div>
            {option==='announcement'&& <Announcement/>}
            </div>
        </div>
    )
}
export default MainContent;