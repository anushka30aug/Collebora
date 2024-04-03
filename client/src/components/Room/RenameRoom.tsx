import { useState } from 'react';
import style from '../../CSS/Room/CreateRoom.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../states/Store';
import { RenameClassroom } from '../../states/Room';

interface Props {
  id: string;
  onClose: () => void;
}

const RenameRoom=({ id,onClose }: Props):React.JSX.Element=>{
    const dispatch =useDispatch<AppDispatch>();
    const[name,setName]=useState('');
    const[code,setCode]=useState('');

    const handleNameChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      setName(e.target.value);
    }

    const handleCodeChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setCode(e.target.value);
    }

    const handleSubmit=(e:React.MouseEvent)=>{
      e.preventDefault();
        dispatch(RenameClassroom({id,name,code})).then((result)=> {
          if (result.payload.success) {
            window.location.reload();
          }
          else{
           onClose()
          }
        })
    }

    return(
        <div className={style.room_form_component}>
        <div className={style.room_form_container}>
          <h2>
            Rename Room
          </h2>
          <form className={style.room_form}>
            <input type="text" name="name" placeholder='New Name' minLength={3} onChange={handleNameChange} required />
            <input type="password" name="code" placeholder='Room Code' minLength={6} onChange={handleCodeChange} required />
            <button className={`${style.create_form_button} ${style.create_form_button1}`} onClick={(e: React.MouseEvent) => { e.preventDefault(); onClose() }}>cancel</button>
            <button type="submit" className={`${style.create_form_button} ${style.create_form_button2}`} disabled={name.length >= 3 && code.length>=6 ? false : true} onClick={handleSubmit}>Rename</button>
          </form>
        </div>
      </div> 
    )
}

export default RenameRoom;