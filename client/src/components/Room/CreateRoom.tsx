import React, { ChangeEvent, FormEvent, useState } from 'react';
// import style from '../../CSS/Room/CreateRoom.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../states/Store';
import { editShowCreateModal } from '../../states/UserInterface';
import { addRoom, createRoom} from '../../states/Room';
import { useAppSelector } from '../../states/Hooks';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const CreateRoom = (): React.JSX.Element => {

    const dispatch = useDispatch<AppDispatch>();

    const [name, setName] = useState<string>('');
    const [classId, setClassId] = useState<string>('');
    const [code, setCode] = useState<string>('');
    const open = useAppSelector(state => state.userInterface.showCreateModal);
    const { isAdmin, isActive } = useAppSelector(state => state.userInterface)


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'name') {
            setName(e.target.value)
        }
        else if (e.target.name === 'classId') {
            setClassId(e.target.value)
        }
        else {
            setCode(e.target.value)
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(createRoom({ code: code, name: name, classId: classId }))
            .then((result) => {
                if (result.payload.success) {
                    if (isActive && isAdmin) {
                        dispatch(addRoom(result.payload.data))
                    }
                }
                dispatch(editShowCreateModal())
            })
    }

    return (
        <div>
        {/*<div className={style.room_form_component}>
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
                </div> */}

            <Dialog
                open={open}
                onClose={() => { return dispatch(editShowCreateModal()) }}
            >
                <DialogTitle>Create Room</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField type="text" name="name" placeholder='Room name' value={name} onChange={handleChange}  margin="dense" fullWidth required variant="standard"/>
                        <TextField type="text" name="classId" placeholder='Room Id(unique)' value={classId} onChange={handleChange}  margin="dense" inputProps={{ minLength: 4, maxLength: 6 }} fullWidth required variant="standard"/>
                        <TextField type="password" name="code" placeholder='Room Code' title='(secret code should not be shared with anyone)'  margin="dense" value={code} onChange={handleChange} inputProps={{ minLength: 6 }} fullWidth required variant="standard"/>
                        <DialogActions>
                            <Button onClick={() => { dispatch(editShowCreateModal()) }}>cancel</Button>
                            <Button type="submit" disabled={name !== '' && code !== '' && classId !== '' ? false : true}>create</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

         </div>
    )
}

export default CreateRoom;