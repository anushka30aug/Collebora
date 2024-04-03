import { useNavigate } from 'react-router-dom'
import style from '../../CSS/Home/RoomsModal.module.css'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../states/Store';
import { editShowDeleteModal, setClassroomDetail } from '../../states/UserInterface';
import { Ellipsis } from '../helper/icons';
import DeleteRoom from '../Room/DeleteRoom';
import { useAppSelector } from '../../states/Hooks';

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
    const showDeleteModal = useAppSelector(state=>state.userInterface.showDeleteModal)
    const isAdmin = useAppSelector(state=>state.userInterface.isAdmin)

    const handleClick = () => {
        dispatch(setClassroomDetail(prop))
        navigate(`/room`);
    };
    return (
        <div className={style.room_modal} >
            {showDeleteModal&&<DeleteRoom id={prop._id}/>}
            <div className={style.main}>
               { isAdmin && <div className={style.options}>
                    <div className={style.ellipsis}>
                        <Ellipsis />
                    </div>
                    <div className={style.dropdown_content}>
                        <p onClick={()=>{}}>Change name</p>
                        <p onClick={()=>{dispatch(editShowDeleteModal())}}>Delete Room</p>
                    </div>
                </div>}
                <h3 onClick={handleClick}>
                    {prop.name}
                </h3>
            </div>
            <p>{prop.adminName}</p>
        </div>
    )
}

export default RoomsModal;