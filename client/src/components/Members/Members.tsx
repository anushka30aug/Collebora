import { useEffect } from "react";
import { useAppSelector } from "../../states/Hooks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../states/Store";
import { fetchMembers } from "../../states/RoomMembers";
import { setLoadingState } from "../../states/UserInterface";
import MembersCard from "./MembersCard";
import style from '../../CSS/Members/Members.module.css'

const Members = (): React.JSX.Element => {
    const dispatch = useDispatch<AppDispatch>();
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
            
           { Members && <h4>Members</h4>}
            <div>
                {
                    Members?.map((member) => {
                        return (
                            <MembersCard name={member.name} profile={member.profilePicture} id={member._id} showEllipses={true}/>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default Members;