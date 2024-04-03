import React, { useState } from 'react';
import style from '../../CSS/Room/CreateRoom.module.css'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../states/Store';
import { editShowDeleteModal } from '../../states/UserInterface';
import { deleteClassroom } from '../../states/Room';

const DeleteRoom = ({ id }: { id: string }): React.JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const [code, setCode] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  }

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(deleteClassroom({ id, code })).then((result)=> {
      if (result.payload.success) {
        window.location.reload();
      }
      else{
        dispatch(editShowDeleteModal());
      }
    }
    )
  }
  return (
    <div className={style.room_form_component}>
      <div className={style.room_form_container}>
        <h2>
          Delete Room
        </h2>
        <form className={style.room_form} >
          <input type="password" name="code" placeholder='Room Code' minLength={6} onChange={handleChange} required />
          <button className={`${style.create_form_button} ${style.create_form_button1}`} onClick={(e: React.MouseEvent) => { e.preventDefault(); dispatch(editShowDeleteModal()) }} >cancel</button>
          <button type="submit" className={`${style.create_form_button} ${style.create_form_button2}`} disabled={code.length >= 6 ? false : true} onClick={handleSubmit}>Delete</button>
        </form>
      </div>
    </div>
  )
}

export default DeleteRoom;