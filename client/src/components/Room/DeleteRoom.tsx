import React, { FormEvent, useState } from 'react';
import style from '../../CSS/Room/CreateRoom.module.css'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../states/Store';
import { deleteClassroom } from '../../states/Room';


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
  )
}

export default DeleteRoom;
