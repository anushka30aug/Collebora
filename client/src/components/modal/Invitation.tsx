import React, { useRef, useState } from "react";
import style from '../../CSS/modal/Invitation.module.css'
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../states/Hooks";
import { sendInvitation } from "../../states/Room";
import { Cross } from "../helper/icons";

const Invitation = ({close}:{close:()=>void}): React.JSX.Element => {
    const dispatch = useAppDispatch();
    const [emailAddress, setEmailAddress] = useState<string[]>([]);
    const classId = useAppSelector(state => state.userInterface.classroomDetail?.classId)
    const currentRef = useRef<HTMLInputElement | null>(null);
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
        if (emailAddress.length === 0) {
            toast.error('add atleast one email address')
        }

        else {
            if (classId !== undefined)
                dispatch(sendInvitation({ classId, emails: emailAddress }))
        }
    }

    return (
        <div className={style.invitation_component}>

            <div className={style.invitation_container}>
                <div className={style.remove} onClick={()=>close()}>
                    <Cross />
                </div>
                    <h1>Invitation</h1>

                <form className={style.invitation_form} onSubmit={handleSubmit}>
                    <input type="email" placeholder="enter e-mail address" ref={currentRef} className={style.input} />
                    <button onClick={handleEmailAdd} className={style.add_button} >Add</button>
                    <button type="submit" className={style.submit_button}>Send Invitation</button>
                </form>
            </div>
        </div>
    )
}


export default Invitation;