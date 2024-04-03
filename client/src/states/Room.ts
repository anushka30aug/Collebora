import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
const host=process.env.REACT_APP_IP_ADDRESS

export const createRoom = createAsyncThunk('classroom/create', async ({ code, name, classId }: { code: string, name: string, classId: string }) => {
    const token = localStorage.getItem('auth-token-workspace')
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    }

    if (token !== null) { headers["auth-token"] = token; }

    const response = await fetch(`${host}/classroom/actions/create`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ classcode: code, name, classId })
    }
    );
    const data = await response.json();
    console.log(data)
    return data;
    
});


export const fetchClassrooms = createAsyncThunk('/classroom/fetch', async () => {
    const token = localStorage.getItem('auth-token-workspace')
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    }
    console.log('as member')
    console.log(host,' host')
    if (token !== null) { headers["auth-token"] = token; }

    const response = await fetch(`${host}/classroom/actions/read`, {
        method: "GET",
        headers: headers
    }
    );
    const data = await response.json();
    console.log(data)
    return data;
})

export const fetchClassroomsAsAdmin = createAsyncThunk('/classroom/fetchAsAdmin', async () => {
    const token = localStorage.getItem('auth-token-workspace')
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    }
    console.log('as admin')
    console.log(host,' host')
    if (token !== null) { headers["auth-token"] = token; }

    const response = await fetch(`${host}/classroom/actions/readAsAdmin`, {
        method: "GET",
        headers: headers
    }
    );
    const data = await response.json();
    console.log(data)
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
    console.log(data)
    return data;
})

export const deleteClassroom=createAsyncThunk('/classroom/delete',async({id,code}:{id:string,code:string})=>{
    const token = localStorage.getItem('auth-token-workspace')
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    }

    if (token !== null) { headers["auth-token"] = token; }

    const response = await fetch(`${host}/classroom/actions/delete`, {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify({ id,classCode:code })
    }
    );
    const data = await response.json();
    console.log(data)
    return data;
})


interface classroom {
    _id: string,
    name: string,
    adminName: string,
    adminId: string,
    classId: string
}

interface stateStructure {
    classroom: classroom[] | null,
}

const initialState: stateStructure = {
    classroom: null,  
}
const Room = createSlice({
    name: 'Room',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(createRoom.pending, (state, action) => {

            })
            .addCase(createRoom.fulfilled, (state, action) => {
                if (action.payload.error) {
                    toast.error(`${action.payload.message}`)
                }
                else {
                    toast.success(`${action.payload.message}`)
                }
            })
            .addCase(createRoom.rejected, (state, actiion) => {
                toast.error(`unexpected error occured`)
            })
            .addCase(fetchClassrooms.pending, (state, action) => {
            })
            .addCase(fetchClassrooms.fulfilled, (state, action) => {
                if (action.payload.error) {
                    toast.error(`${action.payload.message}`)
                }
                else {
                    state.classroom = action.payload.data;
                }
            })
            .addCase(fetchClassrooms.rejected, (state, action) => {
            
                toast.error('unexpected error occured');
            })
            .addCase(fetchClassroomsAsAdmin.pending, (state, action) => {
            })
            .addCase(fetchClassroomsAsAdmin.fulfilled, (state, action) => {
                if (action.payload.error) {
                    toast.error(`${action.payload.message}`)
                }
                else {
                    state.classroom = action.payload.data;
                }
            })
            .addCase(fetchClassroomsAsAdmin.rejected, (state, action) => {
                toast.error('unexpected error occured');
            })
            .addCase(deleteClassroom.pending, (state, action) => {
            })
            .addCase(deleteClassroom.fulfilled, (state, action) => {
                if (action.payload.error) {
                    toast.error(`${action.payload.message}`)
                }
                else {
                    toast.success(`${action.payload.message}`)
                }
            })
            .addCase(deleteClassroom.rejected, (state, action) => {
                toast.error('unexpected error occured');
            })
    },

})

export default Room.reducer;
