import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../states/Store';
import { deleteClassroom } from '../../states/Room';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { editShowDeleteModal } from '../../states/UserInterface';
import { useAppSelector } from '../../states/Hooks';


const DeleteRoom = (): React.JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const [code, setCode] = useState('');
  const [classId, setClassId] = useState('');
  const open = useAppSelector(state=>state.userInterface.showDeleteModal);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  }
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClassId(e.target.value);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(deleteClassroom({ classId, code })).then((result) => {
      if (result.payload.success) {
        window.location.reload();
      }
      else {
        dispatch(editShowDeleteModal())
      }
    })
  }

  return (
    
    <Dialog
    open={open}
    onClose={() => { return dispatch(editShowDeleteModal()) }}
>
    <DialogTitle>Delete Room</DialogTitle>
    <DialogContent>
        <form onSubmit={handleSubmit}>
            <TextField type="text" name="classId" placeholder='Room Id(unique)' value={classId} onChange={handleIdChange}  margin="dense" inputProps={{ minLength: 4, maxLength: 6 }} fullWidth required variant="standard"/>
            <TextField type="password" name="code" placeholder='Room Code' title='(secret code should not be shared with anyone)'  margin="dense" value={code} onChange={handleCodeChange} inputProps={{ minLength: 6 }} fullWidth required variant="standard"/>
            <DialogActions>
                <Button onClick={() => { dispatch(editShowDeleteModal()) }}>cancel</Button>
                <Button type="submit" disabled={code.length >= 6 && classId.length <= 6 && classId.length >3? false : true}>Delete</Button>
            </DialogActions>
        </form>
    </DialogContent>
</Dialog>

  )
}

export default DeleteRoom;
