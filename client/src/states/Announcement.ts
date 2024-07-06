import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { store } from "./Store";
const host=process.env.REACT_APP_IP_ADDRESS

export const fetchAnnouncement = createAsyncThunk('/announcement/fetch', async ({ id }: { id: string }) => {
    const currentState = store.getState(); // Access store within the thunk
    const page = currentState.announcement.page
    const token = localStorage.getItem('auth-token-workspace')
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    }
    if (token !== null) { headers["auth-token"] = token; }
    const response = await fetch(`${host}/classroom/announcement/fetch?id=${id}&page=${page}`,
        {
            method: 'GET',
            headers: headers
        }
    )
    const data = await response.json();
    return data;
})

export const MakeAnnouncements = createAsyncThunk(
    'announcement/make',
    async (formData:FormData) => {
        console.log(formData.entries)
        const token = localStorage.getItem('auth-token-workspace')
        const headers: HeadersInit = {};
        if (token !== null) { headers["auth-token"] = token; }

      const response = await fetch(`${host}/classroom/announcement/create`, {
        method: 'POST',
        headers,
        body: formData,
      });
      const data = await response.json();
      return data;
    }
  );

interface fileStructure {
    name: string,
    contentType: string,
    data: string
}

interface announcementStructure {
    _id: string
    announcement: string,
    date: Date,
    classId: string,
    files: fileStructure[] | null
}
interface stateStructure {
    announcements: announcementStructure[],
    totalCount: number,
    page: number
}
const initialState: stateStructure = {
    announcements: [],
    totalCount: 0,
    page: 1
}

const announcement = createSlice({
    name: 'announcement',
    initialState,
    reducers: {
        incrementPage(state) {
            state.page += 1
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAnnouncement.pending, (state, action) => {

            })
            .addCase(fetchAnnouncement.fulfilled, (state, action) => {

                if (action.payload.error) {
                    toast.error(`${action.payload.message}`)
                }
                else {
                    if (state.page === 1) {
                        state.announcements = [];
                    }
                    state.announcements = [...state.announcements, ...action.payload.data.announcements];
                    state.totalCount = action.payload.data.totalCount;
                }
            })
            .addCase(fetchAnnouncement.rejected, (state, action) => {
                toast.error('unexpected error occured')
            })
            .addCase(MakeAnnouncements.pending,(state,action)=>{
                
            })
            .addCase(MakeAnnouncements.fulfilled,(state,action)=>{
                if(action.payload.error)
                {
                    toast.error(`${action.payload.message}`)
                   
                }
                else{
                    toast.success('announcemet made successfully')
                    console.log(action.payload.data);
                    state.announcements=[action.payload.data,...state.announcements];
                    state.totalCount+=1;
                    console.log(state.announcements)
                }
            })
            .addCase(MakeAnnouncements.rejected,(state,action)=>{
                toast.error('unexpected error occured')
            })
    },
})

export default announcement.reducer;
export const { incrementPage } = announcement.actions


