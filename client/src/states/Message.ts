import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const host = process.env.REACT_APP_IP_ADDRESS

export const fetchMessage = createAsyncThunk('/classroom/chats/messages', async ({ chatId }: { chatId: string }) => {
    const token = localStorage.getItem('auth-token-workspace')
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    }
    if (token !== null) { headers["auth-token"] = token; }
    const response = await fetch(`${host}/classroom/message/read/${chatId}`,
        {
            method: 'GET',
            headers: headers
        }
    )
    const data = await response.json();
    // console.log("message data is ", data)
    return data;
})

export const createMessage = createAsyncThunk('/classroom/chat/send', async ({ message, chatId }: { message: string, chatId: string }) => {
    const token = localStorage.getItem('auth-token-workspace')
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    }
    if (token !== null) { headers["auth-token"] = token; }
    const response = await fetch(`${host}/classroom/message/create`,
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ message, chatId })
        }
    )
    const data = await response.json();
    // console.log(data);
    return data;
})

interface sender{
    name:string,
    profilePicture:string,
    _id:string
}

interface message {
    senderId: sender,
    message: string,
    createdAt: string,
    chatId: string,
    readBy: string[],
    sending?:boolean
}

interface stateStructure {
    messages: message[]
}

const initialState: stateStructure = {
    messages: []
}

const Message = createSlice({
    name: 'message',
    initialState,
    reducers: {
        newMessage(state, action) {
            state.messages = [...state.messages, action.payload];
        },
        removeMessage(state) {
            state.messages = state.messages.filter(message => {
                return message.sending !== true});
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchMessage.fulfilled, (state, action) => {
            if (action.payload.error)
                toast.error(action.payload.message)
            else {
                state.messages = action.payload.data;
            
            }
        })
        builder.addCase(fetchMessage.rejected, (state, action) => {
            toast.error('request rejected')
        })

        builder.addCase(createMessage.fulfilled, (state, action) => {
            if (action.payload.error) {
                toast.error(action.payload.message)
            }
            else {
               
            }         
        })

        builder.addCase(createMessage.rejected,(state,action)=>{
            toast.error('failed to send message')
        })
    }
})

export default Message.reducer;
export const { newMessage,removeMessage } = Message.actions;

