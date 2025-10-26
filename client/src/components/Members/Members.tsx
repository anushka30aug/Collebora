import { useEffect } from "react";
import { useAppSelector } from "../../states/Hooks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../states/Store";
import { fetchMembers } from "../../states/RoomMembers";
import { setLoadingState } from "../../states/UserInterface";
import MembersCard from "./MembersCard";
import style from "../../CSS/Members/Members.module.css";
import { NoAnnouncement } from "../helper/icons";
import { Skeleton } from "@mui/material";

const Members = (): React.JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const Admin = useAppSelector((state) => state.roomMembers.Admin);
  const Members = useAppSelector((state) => state.roomMembers.members);
  const Id = useAppSelector((state) => state.userInterface.classroomDetail?._id);

  useEffect(() => {
    dispatch(setLoadingState(true));
    if (Id !== undefined) {
      dispatch(fetchMembers({ id: Id })).then(() => {
        dispatch(setLoadingState(false));
      });
    } else {
      dispatch(setLoadingState(false));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className={style.member_container}>
      <h4>Admin</h4>
      <div>
        {Admin ? (
          <MembersCard
            name={Admin.name}
            profile={Admin.profilePicture}
            id={Admin._id}
            showEllipses={false}
            role="admin"
          />
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Skeleton animation="wave" variant="circular" width={30} height={30} />
            <Skeleton animation="wave" height={10} width="50%" style={{ marginLeft: 8 }} />
          </div>
        )}
      </div>

      <h4>Members</h4>
      <div>
        {Members ? (
          <>
            {Members.length > 0 ? (
              Members.map((member) => (
                <MembersCard
                  key={member._id}
                  name={member.name}
                  profile={member.profilePicture}
                  id={member._id}
                  showEllipses={true}
                  role="member"
                />
              ))
            ) : (
              <div className={style.no_member}>
                <NoAnnouncement />
                <p>There is no member in this room</p>
              </div>
            )}
          </>
        ) : (
          Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: ".5em",
              }}
            >
              <Skeleton animation="wave" variant="circular" width={30} height={30} />
              <Skeleton animation="wave" height={10} width="50%" style={{ marginLeft: 8 }} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Members;
