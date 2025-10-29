import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface classroomDetail {
  _id: string;
  name: string;
  adminId: string;
  adminName: string;
  classId: string;
  theme?: string;
}

interface structure {
  showMenu: boolean;
  menuOption: "home" | "calendar" | "archive" | "Account" | "Logout";
  showCreateModal: boolean;
  showDeleteModal: boolean;
  showLeaveModal: boolean;
  showRenameModal: boolean;
  showRemoveModal: boolean;
  isAdmin: boolean;
  classroomDetail: classroomDetail | null;
  isLoading: boolean;
  isActive: boolean;
}

const initialState: structure = {
  showMenu: false,
  menuOption: "home",
  showCreateModal: false,
  showDeleteModal: false,
  showLeaveModal: false,
  showRenameModal: false,
  showRemoveModal: false,
  isAdmin: true,
  classroomDetail: null,
  isLoading: false,
  isActive: true,
};

const userInterface = createSlice({
  name: "UserInterface",
  initialState,
  reducers: {
    editShowMenu(state, action: PayloadAction<boolean>) {
      state.showMenu = action.payload;
    },
    setMenuOption(state, action) {
      state.menuOption = action.payload;
    },
    editShowCreateModal(state) {
      state.showCreateModal = !state.showCreateModal;
    },
    editShowDeleteModal(state) {
      state.showDeleteModal = !state.showDeleteModal;
    },
    editShowLeaveModal(state) {
      state.showLeaveModal = !state.showLeaveModal;
    },
    editShowRenameModal(state) {
      state.showRenameModal = !state.showRenameModal;
    },
    editShowRemoveModal(state) {
      state.showRemoveModal = !state.showRemoveModal;
    },
    setIsAdmin(state, action) {
      state.isAdmin = action.payload;
    },
    setClassroomDetail(state, action) {
      state.classroomDetail = action.payload;
    },
    setLoadingState(state, action) {
      state.isLoading = action.payload;
    },
    setIsActive(state, action) {
      state.isActive = action.payload;
    },
  },
});

export default userInterface.reducer;
export const {
  editShowMenu,
  setMenuOption,
  editShowCreateModal,
  editShowDeleteModal,
  editShowLeaveModal,
  editShowRenameModal,
  editShowRemoveModal,
  setIsAdmin,
  setClassroomDetail,
  setLoadingState,
  setIsActive,
} = userInterface.actions;
