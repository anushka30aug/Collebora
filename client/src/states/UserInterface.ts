import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

interface classroomDetail{
    _id:string,
    name:string,
    adminId:string,
    adminName:string,
    classId:string
}

interface structure{
 showMenu:boolean,
 showCreateModal:boolean,
 isAdmin:boolean,
 classroomDetail:classroomDetail|null,
 isLoading:boolean
}

const initialState:structure={
   showMenu:false, 
   showCreateModal:false,
   isAdmin:true,
   classroomDetail:null,
   isLoading:false
}

const userInterface = createSlice({
    name:'UserInterface',
    initialState,
    reducers:{
        editShowMenu(state,action:PayloadAction<boolean>)
        {
            state.showMenu=action.payload
        },
        editShowCreateModal(state)
        {
            state.showCreateModal=!state.showCreateModal
        },
        setIsAdmin(state,action)
        {
            state.isAdmin=action.payload
        },
        setClassroomDetail(state,action)
        {   
            state.classroomDetail=action.payload
        },
        setLoadingState(state,action)
        {
            state.isLoading=action.payload
        }
    }
})

export default userInterface.reducer;
export const {editShowMenu,editShowCreateModal,setIsAdmin,setClassroomDetail,setLoadingState}=userInterface.actions;