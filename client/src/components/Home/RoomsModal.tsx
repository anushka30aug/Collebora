import { useNavigate } from 'react-router-dom'
import style from '../../CSS/Home/RoomsModal.module.css'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../states/Store';
import { setClassroomDetail } from '../../states/UserInterface';
import { Ellipsis } from '../helper/icons';
import DeleteRoom from '../Room/DeleteRoom';
import { useAppSelector } from '../../states/Hooks';
import RenameRoom from '../Room/RenameRoom';
import { useState } from 'react';
import LeaveRoom from '../Room/LeaveRoom';

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
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showRenameModal, setShowRenameModal] = useState(false);
    const [showLeaveModal, setShowLeaveModal] = useState(false);

    const handleClick = () => {
        dispatch(setClassroomDetail(prop))
        navigate(`/room`);
    };

    const handleRenameClick = () => {
        setShowRenameModal(true);
    };

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const handleRenameModalClose = () => {
        setShowRenameModal(false);
    };

    const handleDeleteModalClose = () => {
        setShowDeleteModal(false);
    };

    const handleLeaveClick = () => {
        setShowLeaveModal(true)
    }

    const handleLeaveModalClose = () => {
        setShowLeaveModal(false)
    }

    return (
        <div className={style.room_modal}>
            {showDeleteModal && <DeleteRoom id={prop._id} onClose={handleDeleteModalClose} />}
            {showRenameModal && <RenameRoom id={prop._id} onClose={handleRenameModalClose} />}
            {showLeaveModal && <LeaveRoom id={prop._id} onClose={handleLeaveModalClose} />}
            <div className={style.main}>
                <div className={style.options}>
                    <div className={style.ellipsis}>
                        <Ellipsis />
                    </div>
                    {isAdmin ? <div className={style.dropdown_content}>
                        <p onClick={(e) => { e.preventDefault(); handleRenameClick() }}>Change name</p>
                        <p onClick={(e) => { e.preventDefault(); handleDeleteClick() }}>Delete Room</p>
                    </div> : <div className={style.dropdown_content}>
                        <p onClick={(e) => { e.preventDefault(); handleLeaveClick() }}>Leave Room</p>
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