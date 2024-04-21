// SocketContext.tsx
import React, { createContext, useContext, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

// Import the namespace declaration
import { ChatSocket } from './myChatSocket'

// Define types
export type MyChatSocket = Socket<
  ChatSocket.ListenEvents,
  ChatSocket.EmitEvents
>;

export interface ChatSocketCtxState {
  socket: MyChatSocket;
}

// Define context
export const ChatSocketCtx = createContext<ChatSocketCtxState | null>(null);

// Custom hook to use the chat socket context
export const useChatSocketCtx = () => {
  const context = useContext(ChatSocketCtx);
  if (!context) {
    throw new Error("useChatSocketCtx must be used within a ChatSocketCtxProvider");
  }
  return context;
};

// Chat socket provider component
export const ChatSocketCtxProvider = ({ children }: { children: ReactNode }) => {
  const socket = io("http://localhost:5000", { autoConnect: false });

  return (
    <ChatSocketCtx.Provider value={{ socket }}>
      {children}
    </ChatSocketCtx.Provider>
  );
};
