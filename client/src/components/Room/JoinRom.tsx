import { ChangeEvent, MouseEvent, useState } from 'react';
import style from '../../CSS/Room/JoinRoom.module.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../states/Store';
import { JoinClassroom } from '../../states/RoomMembers';
import { Cross } from '../helper/icons';
import { useNavigate } from 'react-router-dom';
const JoinRoom = (): React.JSX.Element => {

  const dispatch = useDispatch<AppDispatch>();
  const navigate =useNavigate();
  const [classId, setClassId] = useState<string>('');

  const handleClick=(e:MouseEvent)=>{
    e.preventDefault();
    
    dispatch(JoinClassroom(classId)).then(result=>
      {
        if(result.payload.success)
        {
          navigate(-1)
        }
      }
      )

  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setClassId(e.target.value);
  }
  
  return (
    <div className={style.joinRoom_component}>

      <header className={style.header} >
        <span className={style.header_left}>
        <span onClick={()=>{navigate(-1)}}><Cross/></span>
        <h3>Join Room</h3>
        </span>
        <button onClick={handleClick} disabled={classId.length<4}>JOIN</button>
      </header>

      <main className={style.main_container}>
        <div className={style.main}>
          <h4>Room ID</h4>
          <p> Ask Admin for Room ID, then enter it here </p>
          
          <input type="text" placeholder="Room ID" minLength={4} maxLength={6} value={classId} onChange={handleChange} required />
         
        </div>

        <div className={style.instructions}>
          <h4>To sign in with a class code</h4>
          <li>Use an authorised account</li>
          <li>Use a class code with 4-6 letters or numbers</li>
        </div>

      </main>
    </div>
  )
}

export default JoinRoom;