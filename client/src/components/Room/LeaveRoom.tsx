import { useDispatch } from 'react-redux';
import style from '../../CSS/Room/CreateRoom.module.css'
import { AppDispatch } from '../../states/Store';
import { leaveRoom } from '../../states/RoomMembers';

interface Props {
    id: string;
    onClose: () => void; 
}

const LeaveRoom = ({ id, onClose }: Props): React.JSX.Element => {
    const dispatch =useDispatch<AppDispatch>()
    const handleLeaveClick =(e:React.MouseEvent)=>{
        e.preventDefault();
        dispatch(leaveRoom({id})).then(result=>{
            if(result.payload.success)
                {
                    window.location.reload();
                }
        })
        onClose();
    }

    return (
        <div className={style.room_form_component}>
            <div className={style.room_form_container}>
                <h2>
                    Leave Room
                </h2>
                <p>Are you sure want to leave the Room ?</p>
                <button className={`${style.create_form_button} ${style.create_form_button1}`} onClick={(e: React.MouseEvent) => { e.preventDefault(); onClose() }} >cancel</button>
                <button type="submit" className={`${style.create_form_button} ${style.create_form_button2}`} onClick={handleLeaveClick}>Leave</button>
            </div>
        </div>
    )
}

export default LeaveRoom;