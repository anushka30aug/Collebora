import { Cross } from "../helper/icons";
import style from '../../CSS/card/card.module.css'
import React from "react";

const InvitationCard = (prop: { mail: string[] , removeMail:(param:string)=>void }): React.JSX.Element => {
    return (
        <div className={style.main_container}>
            {
                prop.mail.map((item, index) => {
                    return <div key={index} className={style.card_container}>
                        <span>{item}</span>
                        <span onClick={(e:React.MouseEvent)=>{
                            e.preventDefault();
                            prop.removeMail(item)
                        }}>

                        <Cross/>
                        </span>
                    </div>
                }
                )
            }
        </div>
    )
}

export default InvitationCard;