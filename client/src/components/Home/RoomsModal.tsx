import { useNavigate } from 'react-router-dom'
import style from '../../CSS/Home/RoomsModal.module.css'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../states/Store';
import { editShowDeleteModal, editShowLeaveModal, editShowRenameModal, setClassroomDetail } from '../../states/UserInterface';
import { Ellipsis } from '../helper/icons';
import { useAppSelector } from '../../states/Hooks';
import LeaveRoom from '../modal/LeaveRoom';
import { ArchiveRoom } from '../../states/Room';

interface classroom {
    _id: string,
    name: string,
    adminName: string,
    adminId: string,
    classId: string
}

const RoomsModal = (prop: classroom): React.JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const isAdmin = useAppSelector(state => state.userInterface.isAdmin)
    const isActive = useAppSelector(state => state.userInterface.isActive)
    const leaveRoom = useAppSelector(state => state.userInterface.showLeaveModal)


    const handleClick = () => {
        dispatch(setClassroomDetail(prop))
        navigate(`/room`);
    };

    const archiveRoom=()=>{
        dispatch(ArchiveRoom(prop._id)).then(result=>{
            if(result.payload.success)
            {
                window.location.reload()
            }
        })
    }

    return (
        <div className={style.room_modal}>
            {leaveRoom && <LeaveRoom id={prop._id}  />}
            <div className={style.main}>
                <div className={style.options}>
                    <div className={style.ellipsis}>
                        <Ellipsis />
                    </div>
                    {isAdmin ? <div className={style.dropdown_content}>
                        <p onClick={(e) => { e.preventDefault(); dispatch(editShowRenameModal()) }}>Change name</p>
                        <p onClick={(e) => { e.preventDefault(); dispatch(editShowDeleteModal()) }}>Delete Room</p>
                        { 
                        isActive ?
                            <p onClick={(e) => { e.preventDefault(); archiveRoom() }}>Archive Room</p>
                            :
                            <p onClick={(e) => { e.preventDefault(); archiveRoom() }}>Unarchive Room</p>
                        }
                    </div> : <div className={style.dropdown_content}>
                        <p onClick={(e) => { e.preventDefault(); dispatch(editShowLeaveModal()) }}>Leave Room</p>
                    </div>
                    }
                </div>
                <h3 onClick={handleClick}>
                    {prop.name}
                </h3>
            </div>
            <p>{prop.adminName}</p>
        </div>
    )
}

export default RoomsModal;