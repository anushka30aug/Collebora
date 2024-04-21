import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useChatSocketCtx } from "../../context/SocketContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../states/Store";
import { createMessage, fetchMessage, newMessage, removeMessage } from "../../states/Message";
import { useAppSelector } from "../../states/Hooks";
import MessageCard from "./MessageCard";
import style from '../../CSS/chatroom/Chat.module.css'
import { MessageIcon, Send } from "../helper/icons";

const Chatroom = (): React.JSX.Element => {
    const [message, setMessage] = useState<string>('');
    const classroomId = useAppSelector(state => state.userInterface.classroomDetail?._id)
    const userDetail = useAppSelector(state => state.user)
    const allMessages = useAppSelector(state => state.messages.messages)
    const dispatch = useDispatch<AppDispatch>()
    const { socket } = useChatSocketCtx();

    useEffect(() => {
        if (classroomId !== undefined)
            dispatch(fetchMessage({ chatId: classroomId }))

        window.scrollTo(0, document.documentElement.scrollHeight);
        //eslint-disable-next-line
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setMessage(e.target.value)
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (classroomId !== undefined) {
            // create a temporary message 
            const tempMessage = {
                senderId: {
                    name: userDetail.name,
                    profilePicture: userDetail.profilePicture,
                    _id: userDetail._id
                },
                message,
                createdAt: new Date().toLocaleString(),
                chatId: classroomId,
                readBy: [],
                sending: true
            }
            dispatch(newMessage(tempMessage))
            console.log(allMessages)

            dispatch(createMessage({ message, chatId: classroomId })).then((response) => {
                //remove temporary message and add permanent message 
                dispatch(removeMessage())
                console.log(allMessages)
                if (response.payload.success) {
                    // create a new object of message and memebers to emit 
                    const message = {
                        newMessage: {
                            senderId: response.payload.message.newMessage.senderId,
                            chatId: response.payload.message.newMessage.chatId,
                            createdAt: response.payload.message.newMessage.createdAt,
                            message: response.payload.message.newMessage.message
                        },
                        members: response.payload.message.members
                    }
                    socket.emit('new message', message)
                    dispatch(newMessage(response.payload.message.newMessage))
                    console.log(allMessages)
                }
            })
            setMessage('');
        }
    }
    return (
        <div className={style.chat_container}>
            <div className={style.chat}>
                {  allMessages.length!==0?
                   ( allMessages.map(item =>
                        <MessageCard prop={item} />
                    )):<div className={style.emptyChat}>
                        <div className={style.chat_svg}>
                        <MessageIcon/>
                        </div>
                        <h4>Start Conversation..</h4>
                    </div>
                }
            </div>
            <div className={style.form_div}>
                <form onSubmit={handleSubmit} className={style.form} >
                    <input type="text" onChange={handleChange} value={message} placeholder="write a message" className={style.input} required />
                    <button type="submit"><Send /></button>
                </form>
            </div>
        </div>
    )
}

export default Chatroom;
