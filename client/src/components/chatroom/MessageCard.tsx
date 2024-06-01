import style from '../../CSS/chatroom/MessageCard.module.css'
import { useAppSelector } from '../../states/Hooks'
import { Tick, Timer } from '../helper/icons'

interface sender {
    name: string,
    profilePicture: string,
    _id: string
}

interface message {
    senderId: sender,
    message: string,
    createdAt: string,
    chatId: string,
    readBy: string[],
    sending?: boolean
}



const MessageCard = ({ prop }: { prop: message }): React.JSX.Element => {
    const userId = useAppSelector(state => state.user._id)
    const date = new Date(prop.createdAt).toLocaleString()

    return (
        <div className={style.message_container}>
            <div className={`${style.message_card} ${prop.senderId._id === userId ? style.sender_message_card : ''}`}>
                {/* {prop.sending?'bhej rhe':'bhej diya'} */}
                <h5 className={`${style.name_container} ${prop.senderId._id === userId ? style.sender_name_Container : ''}`}>{prop.senderId.name}</h5>
                <div>
                    {prop.message}
                </div>
                <div className={style.date_time_container}>
                    <small>
                        {date.split(',')[1]}
                    </small>

                    {
                        prop.senderId._id === userId ? prop.sending === true ? <Timer /> : <Tick /> : ''
                    }

                </div>
            </div>
        </div>
    )
}

export default MessageCard;