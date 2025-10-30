import { ChangeEvent, MouseEvent, useState } from "react";
import style from "../../CSS/Room/JoinRoom.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../states/Store";
import { JoinClassroom } from "../../states/RoomMembers";
import { Cross } from "../helper/icons";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../states/Hooks";
import { fetchClassrooms } from "../../states/Room";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const JoinRoom = (): React.JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAdmin, isActive } = useAppSelector((state) => state.userInterface);
  const [classId, setClassId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    if (!classId.trim()) return;
    setLoading(true);

    dispatch(JoinClassroom(classId)).then((result) => {
      if (result.payload.success) {
        if (isActive && !isAdmin) {
          dispatch(fetchClassrooms(isActive));
        }
        navigate(-1);
      }
      setLoading(false);
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setClassId(e.target.value);
  };

  return (
    <div className={style.page_wrapper}>
      <div className={style.joinRoom_card}>
        <header className={style.header}>
          <div className={style.header_left}>
            <span onClick={() => navigate(-1)}>
              <Cross />
            </span>
            <h3>Join Room</h3>
          </div>
          <Button
            variant="contained"
            disableElevation
            onClick={handleClick}
            disabled={classId.length < 4 || loading}
            className={style.join_btn}
          >
            {loading ? <CircularProgress size={20} color="inherit" /> : "Join"}
          </Button>
        </header>

        <main className={style.main}>
          <h4>Room ID</h4>
          <p>Ask the admin for the Room ID and enter it below.</p>
          <input
            type="text"
            placeholder="Enter Room ID"
            minLength={4}
            maxLength={6}
            value={classId}
            onChange={handleChange}
            required
          />
        </main>

        <section className={style.instructions}>
          <h4>To join a room:</h4>
          <ul>
            <li>Use an authorized account.</li>
            <li>Enter a valid class code (4–6 letters or numbers).</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default JoinRoom;
