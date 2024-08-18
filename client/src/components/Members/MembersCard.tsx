import { useState } from 'react';
import style from '../../CSS/Members/MembersCard.module.css'
import { useAppSelector } from '../../states/Hooks';
import { Ellipsis } from '../helper/icons';
import RemoveMembers from './RemoveMember';
interface prop{
    name:string,
    profile:string,
    id:string,
    showEllipses:boolean
}
const MembersCard = ({name,profile,id,showEllipses}:prop): React.JSX.Element => {
    console.log("inside members "+ profile);
    const[showRemoveModal,setShowRemoveModal]=useState(false)
    const isAdmin = useAppSelector(state=>state.userInterface.isAdmin)
    
    const handleRemoveClick=()=>{
        setShowRemoveModal(true)
    }

    const handleRemoveModalClose=()=>{
        setShowRemoveModal(false)
    }

    return (
        <div className={style.container}>
            { showRemoveModal && <RemoveMembers userToRemove={id} onClose={handleRemoveModalClose}/>}
        <div className={style.member_card}>
            <div className={style.image_container}>
                <img src={profile} alt="profile"/>
            </div>
            <span className={style.name}>
                {name}
            </span>
        </div>
        {
            isAdmin && showEllipses && <div className={style.option}>
            <span><Ellipsis/></span>
            <div className={style.dropdown_content}>
                        <p onClick={(e) => { e.preventDefault(); handleRemoveClick() }}>Remove</p>
                    </div>
            </div> 
        } 
        </div>
    )
}

export default MembersCard;