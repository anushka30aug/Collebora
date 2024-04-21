// myChatSocket.d.ts
export declare namespace ChatSocket {
    interface EmitEvents {
      "user:login": (token: string, cb: (code: number) => void) => void;
      "setup": (userId: string) => void;
      "new message":(message:messageStructure)=>void
    }
    interface ListenEvents {
      "user:login": (code: number) => void;
      "connected":(userId: string) =>void
      "message received":(newMessage:newMessage)=>void
    }
  }

  interface messageStructure{
    newMessage:newMessage,
    members:string[]
  }

  interface newMessage{
    senderId:sender,
    message:string,
    createdAt:string,
    chatId:string
  }
  
  interface sender{
    name:string,
    profilePicture:string,
    _id:string
}
