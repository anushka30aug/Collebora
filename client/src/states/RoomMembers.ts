import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const host=process.env.REACT_APP_IP_ADDRESS

export const fetchMembers = createAsyncThunk('/classroom/members/fetch',async({id}:{id:string})=>{
    const token = localStorage.getItem('auth-token-workspace')
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    }
    if (token !== null) { headers["auth-token"] = token; }
    const response = await fetch (`${host}/classroom/members/actions/fetch/${id}`,{
        method:'GET',
        headers:headers
    });
    const data = await response.json();
    return data;

})

export const JoinClassroom = createAsyncThunk('/classroom/join', async (classId: string) => {
    const token = localStorage.getItem('auth-token-workspace')
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    }

    if (token !== null) { headers["auth-token"] = token; }

    const response = await fetch(`${host}/classroom/members/actions/create`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ classId })
    }
    );
    const data = await response.json();
    // console.log(data)
    return data;
})

export const leaveRoom = createAsyncThunk('/classroom/members/leave',async({id}:{id:string})=>{
    const token = localStorage.getItem('auth-token-workspace')
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    }

    if (token !== null) { headers["auth-token"] = token; }

    const response = await fetch(`${host}/classroom/members/actions/leave`, {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify({ Id:id })
    }
    );
    const data = await response.json();
    // console.log(data)
    return data;

})

export const RemoveMember=createAsyncThunk('/classroom/members/remove',async({Id,userToRemove,classcode}:{Id:string,userToRemove:string,classcode:string})=>{
    const token = localStorage.getItem('auth-token-workspace')
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    }

    if (token !== null) { headers["auth-token"] = token; }

    const response = await fetch(`${host}/classroom/members/actions/delete`, {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify({ Id,classcode,userToRemove })
    }
    );
    const data = await response.json();
    // console.log(data)
    return data;
})

interface memberStructure{
    name:string,
    emailAddress:string,
    profilePicture:string,
    _id:string,
    googleId:string
}

interface stateStructure{
    members:null|memberStructure[],
    Admin:null|memberStructure
}

const initialState:stateStructure={
    members:null,
    Admin:null
}

const RoomMembers = createSlice({
    name:'roomMembers',
    initialState,
    reducers:{
        
    },
    extraReducers(builder) {
        builder
        .addCase(JoinClassroom.pending, (state, action) => {

        })
        .addCase(JoinClassroom.fulfilled, (state, action) => {
            if (action.payload.error) {
                toast.error(`${action.payload.message}`)
            }
            else {
                toast.success(`room joined successfully`)
            }
        })
        .addCase(JoinClassroom.rejected, (state, action) => {
            toast.success('unexpected error occured')
        })
        .addCase(fetchMembers.pending,(state,action)=>{

        })
        .addCase(fetchMembers.fulfilled,(state,action)=>{
            if(action.payload.error)
            {
                toast.error(`${action.payload.message}`)
            }
            else{
                state.members=action.payload.data.members;
                state.Admin= action.payload.data.admin
            }
        })
        .addCase(fetchMembers.rejected,(state,action)=>{

        })
        .addCase(leaveRoom.pending, (state, action) => {

        })
        .addCase(leaveRoom.fulfilled, (state, action) => {
            if (action.payload.error) {
                toast.error(`${action.payload.message}`)
            }
            else {
                toast.success(`${action.payload.message}`)
            }
        })
        .addCase(leaveRoom.rejected, (state, action) => {
            toast.success('unexpected error occured')
        })
        .addCase(RemoveMember.pending, (state, action) => {

        })
        .addCase(RemoveMember.fulfilled, (state, action) => {
            // console.log(action.payload)
            if (action.payload.error) {
                toast.error(`${action.payload.message}`)
            }
            else {
                toast.success(`${action.payload.message}`)
            }
        })
        .addCase(RemoveMember.rejected, (state, action) => {
            toast.success('unexpected error occured')
        })
    },
})

export default RoomMembers.reducer;
