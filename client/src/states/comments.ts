import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const host = process.env.REACT_APP_IP_ADDRESS

export const fetchComments = createAsyncThunk('/announcement/comments/fetch', async ({ id, announcementId }: { id: string, announcementId: string }) => {
    const token = localStorage.getItem('auth-token-workspace')
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    }
    if (token !== null) { headers["auth-token"] = token; }
    const response = await fetch(`${host}/classroom/announcement/comments/fetch?id=${id}&announcementId=${announcementId}`,
        {
            method: 'GET',
            headers: headers
        }
    )
    const data = await response.json();
    return data;
});


export const addComments = createAsyncThunk('/announcement/comments/add', async (formData:FormData) => {
    const token = localStorage.getItem('auth-token-workspace')
        const headers: HeadersInit = {};
        if (token !== null) { headers["auth-token"] = token; }
    const response = await fetch(`${host}/classroom/announcement/comments/create`,
        {
            method: 'POST',
            headers: headers,
            body: formData
        }
    )
    const data = await response.json();
    return data;
});


interface fileStructure {
    name: string,
    contentType: string,
    data: string
}

interface postedBy{
    name:string,
    profilePicture:string,
    _id:string
}

interface commentStructure {
    _id: string,
    announcementId: string,
    date: Date,
    postedBy: postedBy,
    text: string,
    files: fileStructure[] | null
}

interface stateStructure {
    comments: commentStructure[]
}
const initialState: stateStructure = {
    comments: []
}

const comments = createSlice({
    name: 'comments',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchComments.pending, (state, action) => {

            }
            )
            .addCase(fetchComments.fulfilled, (state, action) => {
                if (action.payload.error) {
                    toast.error(action.payload.error)
                }
                else
                    state.comments = action.payload.data;
            }
            )
            .addCase(fetchComments.rejected, (state, action) => {
                toast.error('server connection Issue \nplease check your internet connectivity')
            }
            )
            .addCase(addComments.pending, (state, action) => {

            }
            )
            .addCase(addComments.fulfilled, (state, action) => {
                if (action.payload.error) {
                    toast.error(action.payload.error)
                }
                else
                    state.comments = [...state.comments,action.payload.data]
            }
            )
            .addCase(addComments.rejected, (state, action) => {
                toast.error('server connection Issue \nplease check your internet connectivity')
            }
            )
    }

})

export default comments.reducer;

