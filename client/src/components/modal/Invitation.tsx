import React, { useRef, useState } from "react";
import style from '../../CSS/modal/Invitation.module.css'
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../states/Hooks";
import { sendInvitation } from "../../states/Room";
import InvitationCard from "../card/InvitationCard";
import { useNavigate } from "react-router-dom";

const Invitation = (): React.JSX.Element => {
    const dispatch = useAppDispatch();
    const [emailAddress, setEmailAddress] = useState<string[]>([]);
    const[InvitationSent,setInvitationSent]=useState<boolean>(false);
    const classId = useAppSelector(state => state.userInterface.classroomDetail?.classId)
    const currentRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();


    const handleEmailAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        if (emailAddress.length > 10) {
            toast(`Can't add more than 10 address at a time`)
        }
        else if (currentRef.current && currentRef.current.value) {
            console.log(currentRef.current.value)
            setEmailAddress([...emailAddress, currentRef.current!.value]);
            console.log(emailAddress)
            currentRef.current.value = "";
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setInvitationSent(true);
        if (emailAddress.length === 0) {
            toast.error('add atleast one email address')
        }

        else {
            if (classId !== undefined)
                dispatch(sendInvitation({ classId, emails: emailAddress })).then(resp=>{
            setInvitationSent(false)
                    if(resp.payload.success){
                        setEmailAddress([]);
                        // navigate(-1);
                    }
                }
            )
            else
            toast.error('undefined classId')
        }
    }

    const removeMail = (mail: string) => {
        const mails = emailAddress.filter(address => address !== mail)
        setEmailAddress(mails);
    }

    return (
        <div className={style.invitation_component}>

            <div className={style.invitation_container}>
                <h1>Invitation</h1>
                <b>The more, the merrier! Invite friends to enhance your experience.</b>
                
                <form className={style.invitation_form} onSubmit={handleSubmit}>
                    <input type="email" placeholder="enter e-mail address" ref={currentRef} className={style.input} />
                    <button onClick={handleEmailAdd} className={style.add_button} disabled={emailAddress.length>=10||InvitationSent===true?true:false} >Add</button>
                    <button type="submit" className={style.submit_button} disabled={emailAddress.length<=0||InvitationSent===true?true:false}>Send Invitation</button>
                </form>
                <ul>
                    <li>
                    Invite your friends to join the room!
                    </li>
                    <li>
                    Enter the email address of the person you want to invite.
                    </li>
                    <small>For example: friend@gmail.com</small>
                    <li>
                    Invitation will be sent to valid email address only.
                    </li>
                    <li>
                    you can not send invitation to more than 10 people at a time
                    </li>
                </ul>
                <InvitationCard mail={emailAddress} removeMail={removeMail} />
            </div>
        </div>
    )
}


export default Invitation;