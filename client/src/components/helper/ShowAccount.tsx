import React, { useState } from "react"
import { useAppSelector } from "../../states/Hooks";
import style from '../../CSS/helper/ShowAccount.module.css'

const ShowAccount= ():React.JSX.Element=>{
    const name = useAppSelector(state=>state.user.name);
    const email = useAppSelector(state=>state.user.emailAddress)
    const image = useAppSelector(state => state.user.profilePicture);
    const [ currentProfile,setCurrentProfile]= useState(image)
    return(
        <div className={style.account_container}>
            <div className={style.profile_picture}>
                    <img src={currentProfile !== null ? currentProfile : ''} alt="" />
            </div>
                         
            <div>
                <h4>{name}</h4>
                <div>{email}</div>
            </div>

        </div>
    )
}

export default ShowAccount;