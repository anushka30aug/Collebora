import React, { ChangeEvent, FormEvent, useState } from 'react';
import style from '../../CSS/Room/CreateRoom.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../states/Store';
import { editShowCreateModal } from '../../states/UserInterface';
import { addRoom, createRoom, fetchClassrooms } from '../../states/Room';
import { useAppSelector } from '../../states/Hooks';

const CreateRoom = (): React.JSX.Element => {

    const dispatch = useDispatch<AppDispatch>();

    const [name, setName] = useState<string>('');
    const[classId,setClassId]=useState<string>('');
    const [code, setCode] = useState<string>('');

    const {isAdmin,isActive}=useAppSelector(state=>state.userInterface)


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'name') {
            setName(e.target.value)
        }
        else if(e.target.name==='classId'){
            setClassId(e.target.value)
        }
        else {
            setCode(e.target.value)
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(createRoom({code:code,name:name,classId:classId}))
        .then((result)=>{
             if(result.payload.success)
             {
                if(isActive && isAdmin){
                    dispatch(addRoom(result.payload.data))
                }
             }
             dispatch(editShowCreateModal())
        })
    }

    return (
        <div className={style.room_form_component}>
            <div className={style.room_form_container}>
                <h2>
                    Create Room
                </h2>
                <form className={style.room_form} onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder='Room name' minLength={3} maxLength={30} value={name} onChange={handleChange} required />
                    <input type="text" name="classId" placeholder='Room Id(unique)'  minLength={4} maxLength={6} value={classId} onChange={handleChange} required />
                    <input type="password" name="code" placeholder='Room Code' title='(secret code should not be shared with anyone)' minLength={6} value={code} onChange={handleChange} required />
                    <button className={`${style.create_form_button} ${style.create_form_button1}`} onClick={()=>{ dispatch(editShowCreateModal())}}>cancel</button>
                    <button type="submit" className={`${style.create_form_button} ${style.create_form_button2}`} disabled={name !== '' && code !== '' && classId!=='' ? false : true}>create</button>
                </form>
            </div>
        </div>
    )
}

export default CreateRoom;