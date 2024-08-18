import React, { FormEvent, useState } from 'react';
import style from '../../CSS/Room/CreateRoom.module.css'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../states/Store';
import { deleteClassroom } from '../../states/Room';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import Button from '@mui/material/Button';

interface Props {
  id: string;
  onClose: () => void; // Function to close the modal
}

const DeleteRoom = ({ id, onClose }: Props): React.JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const [code, setCode] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(deleteClassroom({ id, code })).then((result) => {
      if (result.payload.success) {
        window.location.reload();
      }
      else {
        onClose()
      }
    })
  }

  return (
    <div className={style.room_form_component}>
      <div className={style.room_form_container}>
        <h2>
          Delete Room
        </h2>
        <form className={style.room_form} onSubmit={handleSubmit}>
          <input type="password" name="code" placeholder='Room Code' minLength={6} onChange={handleChange} required />
          <button className={`${style.create_form_button} ${style.create_form_button1}`} onClick={(e: React.MouseEvent) => { e.preventDefault(); onClose() }} >cancel</button>
          <button type="submit" className={`${style.create_form_button} ${style.create_form_button2}`} disabled={code.length >= 6 ? false : true}>Delete</button>
        </form>
      </div>
    </div>

    // <div>
    //   <Dialog
    //     open={true}
    //     onClose={onClose}
    //   >
    //     <DialogTitle>Create Room</DialogTitle>
    //     <DialogContent>
    //       <form onSubmit={handleSubmit}>
    //         <TextField type="password" name="code" placeholder='Room Code' margin="dense" value={code} onChange={handleChange} inputProps={{ minLength: 6 }} fullWidth required variant="standard" />
    //         <DialogActions>
    //           <Button onClick={(e) => { e.preventDefault(); onClose(); }}>cancel</Button>
    //           <Button type="submit" disabled={code.length >= 6 ? false : true}>create</Button>
    //         </DialogActions>
    //       </form>
    //     </DialogContent>
    //   </Dialog>

    // </div>
  )
}

export default DeleteRoom;
