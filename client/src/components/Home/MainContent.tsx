import { useAppSelector } from "../../states/Hooks";
import RoomsModal from "./RoomsModal";
import style from "../../CSS/Home/MainContent.module.css";
import RoomNotFound from "./RoomNotFound";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../states/Store";
import { fetchClassrooms, fetchClassroomsAsAdmin } from "../../states/Room";
import { setIsAdmin, setLoadingState } from "../../states/UserInterface";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";

const MainContent = (): React.JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  let classrooms = useAppSelector((state) => state.room.classroom);
  const isAdmin = useAppSelector((state) => state.userInterface.isAdmin);
  const isActive = useAppSelector((state) => state.userInterface.isActive);
  const isLoading = useAppSelector((state) => state.userInterface.isLoading);
  useEffect(() => {
    if (localStorage.getItem("auth-token-workspace") === null || undefined) {
      navigate("/auth");
    } else {
      dispatch(setLoadingState(true));
      if (isAdmin === true) {
        dispatch(fetchClassroomsAsAdmin(isActive)).then(() => {
          dispatch(setLoadingState(false));
        });
      } else {
        dispatch(fetchClassrooms(isActive)).then(() => {
          dispatch(setLoadingState(false));
        });
      }
    }
    // eslint-disable-next-line
  }, [isAdmin, isActive]);

  const handleIsAdmin = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: boolean
  ) => {
    dispatch(setIsAdmin(value));
  };

  return (
    <div className={style.rooms_container}>
      <div className={style.rooms_header}>
        <button
          className={`${style.rooms_header_button} ${
            isAdmin === true ? style.button_active : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            handleIsAdmin(e, true);
          }}
        >
          Created
        </button>
        <button
          className={`${style.rooms_header_button} ${
            isAdmin === false ? style.button_active : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            handleIsAdmin(e, false);
          }}
        >
          Joined
        </button>
      </div>

      <div className={style.rooms_main}>
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              sx={{ height: 150 }}
              animation="wave"
              variant="rectangular"
              width={300}
              style={{ margin: ".5em", borderRadius: "1em" }}
            />
          ))
        ) : classrooms !== null && classrooms.length !== 0 ? (
          classrooms.map((rooms) => (
            <RoomsModal
              key={rooms._id}
              _id={rooms._id}
              name={rooms.name}
              adminId={rooms.adminId}
              adminName={rooms.adminName}
              classId={rooms.classId}
              theme={rooms.theme}
            />
          ))
        ) : (
          <RoomNotFound />
        )}
      </div>
    </div>
  );
};

export default MainContent;
