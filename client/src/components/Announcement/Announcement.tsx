import { useEffect } from "react";
import { useAppSelector } from "../../states/Hooks";
import AnnouncementCard from "./AnnouncementCard";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../states/Store";
import { fetchAnnouncement, incrementPage } from "../../states/Announcement";
import { setLoadingState } from "../../states/UserInterface";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner, Copy } from "../helper/icons";
import NoAnnouncements from "./NoAnnouncements";
import toast from "react-hot-toast";
import style from "../../CSS/Announcement/Announcement.module.css";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import MakeAnnouncement from "./MakeAnnouncement";

const Announcement = (): React.JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const Id = useAppSelector(
    (state) => state.userInterface.classroomDetail?._id
  );
  const theme = useAppSelector(
    (state) => state.userInterface.classroomDetail?.theme
  );
  const Announcements = useAppSelector(
    (state) => state.announcement.announcements
  );
  const className = useAppSelector(
    (state) => state.userInterface.classroomDetail?.name
  );
  const classId = useAppSelector(
    (state) => state.userInterface.classroomDetail?.classId
  );
  const totalCount = useAppSelector((state) => state.announcement.totalCount);
  const isLoading = useAppSelector((state) => state.userInterface.isLoading);
  const isAdmin = useAppSelector((state) => state.userInterface.isAdmin);
  useEffect(() => {
    dispatch(setLoadingState(true));
    if (Id !== undefined) {
      dispatch(fetchAnnouncement({ id: Id })).then(() => {
        dispatch(setLoadingState(false));
      });
    } else {
      dispatch(setLoadingState(false));
    }
    //eslint-disable-next-line
  }, []);

  const hasMore = () => {
    if (Announcements.length < totalCount) {
      return true;
    } else {
      return false;
    }
  };

  const fetchMore = () => {
    dispatch(incrementPage());
    if (Id !== undefined) dispatch(fetchAnnouncement({ id: Id }));
  };

  return (
    <div>
      <div>
        <div
          className={style.intro}
          style={{
            backgroundImage: `url(${
              theme || "https://gstatic.com/classroom/themes/img_graduation.jpg"
            })`,
          }}
        >
          <div className={style.intro_name}>{className}</div>
          {isAdmin && (
            <div className={style.intro_id}>
              <span>{classId}</span>
              <button
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  navigator.clipboard.writeText(`${classId}`);
                  toast.success("copied");
                }}
              >
                <Copy />
              </button>
            </div>
          )}
          {isAdmin && (
            <div className={style.join_invitation}>
              <button
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  navigate("/Invitation");
                }}
              >
                Send Invitation
              </button>
            </div>
          )}
          
        </div>
        <div>
          {
            isAdmin && <MakeAnnouncement/>
          }
        </div>
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => {
            return (
              <Skeleton
                variant="rectangular"
                width="100%"
                height={200}
                style={{
                  maxWidth: "600px",
                  borderRadius: "1em",
                  margin: window.innerWidth >= 900 ? "1em 2em" : "1em auto",
                }}
              />
            );
          })
        ) : totalCount > 0 ? (
          <InfiniteScroll
            dataLength={Announcements.length}
            hasMore={hasMore()}
            next={fetchMore}
            loader={
              <div style={{ margin: " 1em auto", maxWidth: "max-content" }}>
                <Spinner />
              </div>
            }
          >
            {Announcements.map((announcement, index) => (
              <AnnouncementCard key={index} announcement={announcement} />
            ))}
          </InfiniteScroll>
        ) : (
          <div>
            <NoAnnouncements />
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcement;
