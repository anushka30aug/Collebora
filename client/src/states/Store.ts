import { configureStore } from "@reduxjs/toolkit";
import User from "./User";
import userInterface from "./UserInterface";
import Room from "./Room";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from 'redux-persist/lib/storage/session'
import RoomMembers from "./RoomMembers";
import Announcement from "./Announcement";
import Message from "./Message";

const persistUser = {
  key: 'user',
  storage:storageSession
}

const persistUI = {
  key: 'UI',
  storage: storageSession,
  whitelist: ['showMenu', 'isAdmin', 'classroomDetail', 'isActive', 'menuOption']
}

// Wrap each reducer with persistReducer
const persistedUserReducer = persistReducer(persistUser, User);
const persistedUIReducer = persistReducer(persistUI, userInterface);

// Configure the Redux store
export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    userInterface: persistedUIReducer,
    room: Room,
    roomMembers: RoomMembers,
    announcement: Announcement,
    messages:Message
  }
});

// Create the persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



