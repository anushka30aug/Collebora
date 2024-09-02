import { useEffect } from "react";
import { useAppSelector } from "../../states/Hooks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../states/Store";
import { fetchMembers } from "../../states/RoomMembers";
import { setLoadingState } from "../../states/UserInterface";
import MembersCard from "./MembersCard";
import style from '../../CSS/Members/Members.module.css'
import { NoAnnouncement } from "../helper/icons";
// import { useNavigate } from "react-router-dom";

const Members = (): React.JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
    // const navigate = useNavigate();
    const Admin = useAppSelector(state => state.roomMembers.Admin);
    const Members = useAppSelector(state => state.roomMembers.members);
    const Id = useAppSelector(state => state.userInterface.classroomDetail?._id)
    useEffect(() => {
        dispatch(setLoadingState(true))
        if (Id !== undefined) {
            dispatch(fetchMembers({ id: Id })).then(() => {
                dispatch(setLoadingState(false))
            })
        }
        else {
            dispatch(setLoadingState(false))
        }
        //eslint-disable-next-line
    }, [])
    return (
        <div className={style.member_container}>
           { Admin && <h4>Admin</h4> }
            <div>
                {
                    Admin ? <MembersCard name={Admin.name} profile={Admin.profilePicture} id={Admin._id} showEllipses={false} /> : ''
                }

            </div>
            
            <h4>Members</h4>
            <div>
                {
                   Members.length>0? Members.map((member) => {
                        return (
                            <MembersCard name={member.name} profile={member.profilePicture} id={member._id} showEllipses={true}/>
                        );
                    }):<div className={style.no_member}>
                        <NoAnnouncement/>
                        <br/>
                        (
                            There is no member in this room 
                        )
                        </div>
                }
            </div>
        </div>
    )
}

export default Members;