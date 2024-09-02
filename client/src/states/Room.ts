import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
const host = process.env.REACT_APP_IP_ADDRESS

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
    return data;

});


export const fetchClassrooms = createAsyncThunk('/classroom/fetch', async (isActive:boolean) => {
    const token = localStorage.getItem('auth-token-workspace')
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    }
    console.log('as member')
    console.log(host, ' host')
    if (token !== null) { headers["auth-token"] = token; }

    const response = await fetch(`${host}/classroom/actions/read?isActive=${isActive}`, {
        method: "GET",
        headers: headers
    }
    );
    const data = await response.json();
    return data;
})

export const fetchClassroomsAsAdmin = createAsyncThunk('/classroom/fetchAsAdmin', async (isActive:boolean) => {
    const token = localStorage.getItem('auth-token-workspace')
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    }
    if (token !== null) { headers["auth-token"] = token; }

    const response = await fetch(`${host}/classroom/actions/readAsAdmin?isActive=${isActive}`, {
        method: "GET",
        headers: headers
    }
    );
    const data = await response.json();
    return data;
})

export const RenameClassroom = createAsyncThunk('/classroom/update', async ({ classId, name, code }: { classId: string, name: string, code: string }) => {
    const token = localStorage.getItem('auth-token-workspace')
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    }

    if (token !== null) { headers["auth-token"] = token; }

    const response = await fetch(`${host}/classroom/actions/update/${classId}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({ newName: name, classcode: code })
    }
    );
    const data = await response.json();
    // console.log(data)
    return data;
})

export const deleteClassroom = createAsyncThunk('/classroom/delete', async ({ classId, code }: { classId: string, code: string }) => {
    const token = localStorage.getItem('auth-token-workspace')
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    }

    if (token !== null) { headers["auth-token"] = token; }
   console.log(classId,code);
    const response = await fetch(`${host}/classroom/actions/delete`, {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify({ classId, classCode: code })
    }
    );
    const data = await response.json();
    // console.log(data)
    return data;
})

export const ArchiveRoom = createAsyncThunk('/classroom/archive/toogle',async(id:string)=>{
    const token = localStorage.getItem('auth-token-workspace')
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    }

    if (token !== null) { headers["auth-token"] = token; }
    const response = await fetch(`${host}/classroom/actions/archive`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({id})
    } 
    );
    const data = await response.json();
    // console.log(data)
    return data;
})


export const sendInvitation = createAsyncThunk('/classroom/sendInvitation',async({classId,emails}:{classId:string,emails:string[]})=>{
    const token = localStorage.getItem('auth-token-workspace')
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    }

    if (token !== null) { headers["auth-token"] = token; }
    const response = await fetch(`${host}/classroom/invitation/send`,{
        method: "POST",
        headers: headers,
        body: JSON.stringify({classId,emails})
    })

    const data = await response.json();
    // console.log(data)
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
    classroom: classroom[] ,
}

const initialState: stateStructure = {
    classroom: [],
}
const Room = createSlice({
    name: 'Room',
    initialState,
    reducers: {
        addRoom(state,action){
            state.classroom=[...state.classroom,action.payload];
        }
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
                    toast.success('room created successfully')
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
            .addCase(RenameClassroom.pending, (state, action) => {
            })
            .addCase(RenameClassroom.fulfilled, (state, action) => {
                if (action.payload.error) {
                    toast.error(`${action.payload.message}`)
                }
                else {
                    toast.success(`${action.payload.message}`)
                }
            })
            .addCase(RenameClassroom.rejected, (state, action) => {
                toast.error('unexpected error occured');
            })
            .addCase(deleteClassroom.pending, (state, action) => {
            })
            .addCase(deleteClassroom.fulfilled, (state, action) => {
                if (action.payload.error) {
                    toast.error(`${action.payload.message}`);
                }
                else {
                    toast.success(`${action.payload.message}`);
                }
            })
            .addCase(deleteClassroom.rejected, (state, action) => {
                toast.error('unexpected error occured');
            })
            .addCase(ArchiveRoom.pending, (state, action) => {
            })
            .addCase(ArchiveRoom.fulfilled, (state, action) => {
                if (action.payload.error) {
                    toast.error(`${action.payload.message}`)
                }
                else {
                    toast.success(`${action.payload.message}`)
                }
            })
            .addCase(ArchiveRoom.rejected, (state, action) => {
                toast.error('Network error');
            })
            .addCase(sendInvitation.pending, (state, action) => {
            })
            .addCase(sendInvitation.fulfilled, (state, action) => {
                if (action.payload.error) {
                    toast.error(`${action.payload.message}`);
                }
                else {
                    toast.success(`${action.payload.message}`);
                }
            })
            .addCase(sendInvitation.rejected, (state, action) => {
                toast.error('Network error');
            })
    },

})

export default Room.reducer;
export const {addRoom} = Room.actions;
