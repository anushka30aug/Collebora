import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../states/Store';
import style from '../../CSS/Home/RoomNotFound.module.css';
import { editShowCreateModal } from '../../states/UserInterface';
import { useNavigate } from 'react-router-dom';

const RoomNotFound = (): React.JSX.Element => {
    const dispatch =useDispatch<AppDispatch>();
    const navigate = useNavigate();
    return (
        <div className={style.main_container}>
            <div className={style.image}>
                <img src="https://www.gstatic.com/classroom/empty_states_home.svg" alt="create new room" />
            </div>
            <div>Add a room to get started</div>
            <button className={style.main_button_1} onClick={(e:React.MouseEvent)=>{e.preventDefault();dispatch(editShowCreateModal())}}>create a Room</button>
            <button className={style.main_button_2} onClick={(e:React.MouseEvent)=>{navigate('/joinRoom')}}>Join a Room</button>
        </div>
    )
}
export default RoomNotFound;