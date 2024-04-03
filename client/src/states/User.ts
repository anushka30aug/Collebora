import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
const host=process.env.REACT_APP_IP_ADDRESS

export const fetchUser = createAsyncThunk('user', async () => {
    const token = localStorage.getItem('auth-token-workspace')
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    }

    if (token !== null) { headers["auth-token"] = token; }

    const response = await fetch(`${host}/classroom/user/fetch`, {
        method: "GET",
        headers:headers
    }
    );
    const data = await response.json();
    return data;

})

interface userStructure {
    name: string | null,
    emailAddress: string | null,
    _id: string | null,
    googleId: string | null,
    profilePicture: string | null,
}

const initialState: userStructure = {
    name: null,
    emailAddress: null,
    _id: null,
    googleId: null,
    profilePicture: null,
}

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
        .addCase(fetchUser.pending,(state,action)=>{
            //task to do while the data fetching is in process
        })
        .addCase(fetchUser.fulfilled,(state,action)=>{
           console.log(action.payload)
           if(action.payload.error)
           {
               toast.error(`${action.payload.message}`)
           }
           else{
           state._id=action.payload.data._id;
           state.emailAddress=action.payload.data.emailAddress;
           state.googleId=action.payload.data.googleId;
           state.name=action.payload.data.name;
           state.profilePicture=action.payload.data.profilePicture;
           
           }
        })
        .addCase(fetchUser.rejected,(state,action)=>{
            //task to do when the request is rejected
        })
    },

})

export default user.reducer;