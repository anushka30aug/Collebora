import { useEffect } from "react";
import { useAppSelector } from "../../states/Hooks";
import AnnouncementCard from "./AnnouncementCard";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../states/Store";
import { fetchAnnouncement, incrementPage } from "../../states/Announcement";
import MakeAnnouncement from "./MakeAnnouncement";
import { setLoadingState } from "../../states/UserInterface";
import InfiniteScroll from "react-infinite-scroll-component";
import {  Spinner } from "../helper/icons";
import NoAnnouncements from "./NoAnnouncements";

const Announcement = (): React.JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
    const Id = useAppSelector(state => state.userInterface.classroomDetail?._id)
    const Announcements = useAppSelector(state => state.announcement.announcements)
    const totalCount = useAppSelector(state => state.announcement.totalCount)
    const isLoading = useAppSelector(state => state.userInterface.isLoading)
    const isAdmin = useAppSelector(state => state.userInterface.isAdmin);
    useEffect(() => {
        dispatch(setLoadingState(true))
        if (Id !== undefined) {
            dispatch(fetchAnnouncement({id:Id})).then(() => {
                dispatch(setLoadingState(false))
            })

        }
        else {
            dispatch(setLoadingState(false))
        }
        //eslint-disable-next-line
    }, [])

    const hasMore = () => {
        if (Announcements.length < totalCount) {
            return true;
        }
        else {
            return false;
        }
    }

    const fetchMore = () => {
       dispatch(incrementPage());
        if (Id !== undefined)
        dispatch(fetchAnnouncement({id:Id}));
    }

    return (
        <div>

            <div>
                {
                    isAdmin && <MakeAnnouncement />
                }
            </div>
            {
                isLoading ? ('') :(  totalCount > 0 ? (
                    <InfiniteScroll
                        dataLength={Announcements.length}
                        hasMore={hasMore()}
                        next={fetchMore}
                        loader={<div style={{margin:' 1em auto',maxWidth:'max-content'}}>
                            <Spinner/>
                            </div>}
                    >
                        {Announcements.map((announcement, index) => (
                            <AnnouncementCard key={index} announcement={announcement} />
                        ))}
                    </InfiniteScroll>

                ) : (
                    <div><NoAnnouncements/></div>
                ))
            }
        </div>
    )
}

export default Announcement;