import style from '../../CSS/Members/MembersCard.module.css'
import { useAppDispatch, useAppSelector } from '../../states/Hooks';
import { Ellipsis } from '../helper/icons';
import RemoveMembers from '../modal/RemoveMember';
import { editShowRemoveModal } from '../../states/UserInterface';
interface prop{
    name:string,
    profile:string,
    id:string,
    showEllipses:boolean
}
const MembersCard = ({name,profile,id,showEllipses}:prop): React.JSX.Element => {
        const dispatch = useAppDispatch();

    const showRemoveModal=useAppSelector(state=>state.userInterface.showRemoveModal);
    const isAdmin = useAppSelector(state=>state.userInterface.isAdmin)
   

    return (
        <div className={style.container}>
            { showRemoveModal && <RemoveMembers userToRemove={id}/>}
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
                        <p onClick={(e) => { e.preventDefault(); dispatch(editShowRemoveModal()) }}>Remove</p>
                    </div>
            </div> 
        } 
        </div>
    )
}

export default MembersCard;