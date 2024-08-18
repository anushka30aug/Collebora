import { useState } from 'react';
import style from '../../CSS/Room/CreateRoom.module.css'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../states/Store';
import { useAppSelector } from '../../states/Hooks';
import { RemoveMember } from '../../states/RoomMembers';
// import 

interface Props {
    userToRemove: string;
    onClose: () => void; // Function to close the modal
}

const RemoveMembers = ({ userToRemove, onClose }: Props): React.JSX.Element => {

    const [code, setCode] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const Id = useAppSelector(state => state.userInterface.classroomDetail?._id)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value)
    }

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault()
        if (Id !== undefined)
            dispatch(RemoveMember({ userToRemove, Id, classcode: code })).then((result)=>{
               if(result.payload.success)
                {
                    window.location.reload()
                }
            })
        onClose();
    }

    return (
        <div className={style.room_form_component}>
            <div className={style.room_form_container}>
                <h2>
                    Remove Member
                </h2>
                <form className={style.room_form}>
                    <input type="password" name="code" placeholder='Room Code' minLength={6} onChange={handleChange} required />
                    <button className={`${style.create_form_button} ${style.create_form_button1}`} onClick={(e: React.MouseEvent) => { e.preventDefault(); onClose() }} >cancel</button>
                    <button type="submit" className={`${style.create_form_button} ${style.create_form_button2}`} disabled={code.length >= 6 ? false : true} onClick={handleSubmit}>Remove</button>
                </form>
            </div>
        </div>
    )
}

export default RemoveMembers;