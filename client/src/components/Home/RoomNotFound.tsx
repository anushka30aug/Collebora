import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../states/Store';
import style from '../../CSS/Home/RoomNotFound.module.css';
import { editShowCreateModal } from '../../states/UserInterface';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useAppSelector } from '../../states/Hooks';

const RoomNotFound = (): React.JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const active = useAppSelector(state => state.userInterface.isActive);

    return (
        <div className={style.main_container}>
            <div className={style.image}>
                <img src="https://www.gstatic.com/classroom/empty_states_home.svg" alt="create new room" />
            </div>
            {
                active ? <div>Add a room to get started</div> : <h3>No room in this section</h3>
            }

            {active && <Stack spacing={2} direction="row" my={2}>
                <Button variant="outlined" onClick={(e: React.MouseEvent) => { e.preventDefault(); dispatch(editShowCreateModal()) }}>Create Room</Button>
                <Button variant="contained" onClick={(e: React.MouseEvent) => { navigate('/joinRoom') }}>Join Room</Button>
            </Stack>}
        </div>
    )
}
export default RoomNotFound;