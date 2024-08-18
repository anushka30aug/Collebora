import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
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
    const allMessages = useAppSelector(state => state.messages.messages);
    const isActive  = useAppSelector(state=>state.userInterface.isActive);
    const dispatch = useDispatch<AppDispatch>()
    const { socket } = useChatSocketCtx();

    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        if (classroomId !== undefined) {
            dispatch(fetchMessage({ chatId: classroomId }))
                .then(() => scrollToBottom()); // Scroll to bottom after messages are fetched
        }
        //eslint-disable-next-line
    }, [classroomId]);

    useEffect(() => {
        scrollToBottom(); // Scroll to bottom whenever messages change
    }, [allMessages]);

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

            dispatch(createMessage({ message, chatId: classroomId })).then((response) => {
                //remove temporary message and add permanent message 
                dispatch(removeMessage())
                if (response.payload.success) {
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
                }
                scrollToBottom(); // Scroll after a new message is sent
            })
            setMessage('');
        }
    }

    return (
        <div className={style.chat_container}>
            <div className={style.chat}>
                {allMessages.length !== 0 ?
                    (allMessages.map((item, index, arr) => {
                        if (index >= 1) {
                            if (arr[index - 1].createdAt.split('T')[0] !== arr[index].createdAt.split('T')[0]) {
                                return (
                                    <div key={index}>
                                        <div className={style.date}>
                                            {item.createdAt.split('T')[0]}
                                        </div>
                                        <MessageCard prop={item} />
                                    </div>
                                )
                            } else {
                                return <MessageCard key={index} prop={item} />
                            }
                        } else {
                            return (
                                <div key={index}>
                                    <div className={style.date}>
                                        {item.createdAt.split('T')[0]}
                                    </div>
                                    <MessageCard prop={item} />
                                </div>
                            )
                        }
                    }
                    )) : <div className={style.emptyChat}>
                        <div className={style.chat_svg}>
                            <MessageIcon />
                        </div>
                        <h4>Start Conversation..</h4>
                    </div>
                }
                {/* Scroll to this div */}
                <div ref={chatEndRef}></div>
            </div>
            <div className={style.form_div} style={{display:isActive?'block':'none'}}>
                <form onSubmit={handleSubmit} className={style.form} >
                    <input type="text" onChange={handleChange} value={message} placeholder="write a message" className={style.input} required />
                    <button type="submit"><Send /></button>
                </form>
            </div>
        </div>
    )
}

export default Chatroom;
