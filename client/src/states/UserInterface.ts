import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

interface classroomDetail {
    _id: string,
    name: string,
    adminId: string,
    adminName: string,
    classId: string
}

interface structure {
    showMenu: boolean,
    menuOption:'home'|'calendar'|'archive',
    showCreateModal: boolean,
    isAdmin: boolean,
    classroomDetail: classroomDetail | null,  //when user visited a particular class set that class detail to use in performing any task in that class this help to avoid prop drilling
    isLoading: boolean,
    isActive: boolean //to check if we are currently in Active Room section or Archive Room Section
}

const initialState: structure = {
    showMenu: false,
    menuOption:'home',
    showCreateModal: false,
    isAdmin: true,
    classroomDetail: null,
    isLoading: false,
    isActive: true
}

const userInterface = createSlice({
    name: 'UserInterface',
    initialState,
    reducers: {
        editShowMenu(state, action: PayloadAction<boolean>) {
            state.showMenu = action.payload
        },
        setMenuOption(state,action){
            state.menuOption=action.payload
        },
        editShowCreateModal(state) {
            state.showCreateModal = !state.showCreateModal
        },
        setIsAdmin(state, action) {
            state.isAdmin = action.payload
        },
        setClassroomDetail(state, action) {
            state.classroomDetail = action.payload
        },
        setLoadingState(state, action) {
            state.isLoading = action.payload
        },
        setIsActive(state, action) {
            state.isActive = action.payload
        }
    }
})

export default userInterface.reducer;
export const { editShowMenu,setMenuOption, editShowCreateModal, setIsAdmin, setClassroomDetail, setLoadingState, setIsActive } = userInterface.actions;