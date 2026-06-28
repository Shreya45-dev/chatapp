/*import { use, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import React from 'react'
import { setMessageUser } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
    
    const dispatch=useDispatch()
    const messages=useSelector((state)=>state.messageuser.messageuser)
    const {socket}=useSelector((state)=>state.socket)
     useEffect(() => {
       socket?.on("newMessage",(newMessage)=>{
        dispatch(setMessageUser([...messages,newMessage]))
    

       })

     
     
     }, [socket,setMessageUser,messages])
     

  return null;
}

export default useGetRealTimeMessage
*/



//2----------------------------------------------------------------------------------
/*import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessageUser } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
  const dispatch = useDispatch();

  const messages = useSelector(
    (state) => state.messageuser.messageuser
  );

  const { socket } = useSelector((state) => state.socket);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      dispatch(setMessageUser([...messages, newMessage]));
    };
       
    socket.on("newMessage", handleNewMessage);
    socket.on("newMessage", (msg) => {
    console.log("📩 MESSAGE RECEIVED:", msg);

    if (msg.isSocket) {
        console.log("⚡ THIS IS SOCKET MESSAGE");
    } else {
        console.log("💾 THIS IS DB MESSAGE");
    }
});

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, messages, dispatch]);

  return null;
};

export default useGetRealTimeMessage;*/



/*import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, setMessageUser } from "../redux/messageSlice";
import {  markMessagesRead } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.socket);
  const messages = useSelector((state) => state.messageuser.messageuser);
  const selectuser=useSelector((state)=>state.selectedUser.selectedUser)
  
 

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (msg) => {
  //  alert("📩 MESSAGE RECEIVED:", msg);

      if (msg.isSocket) {
        console.log("⚡ SOCKET MESSAGE");
        
      } else {
        console.log("💾 DB MESSAGE");
      }
      if(msg.senderId === selectuser?._id ||
    msg.receiverId === selectuser?._id){
      //dispatch(setMessageUser([...messages, msg]));
      
      dispatch(addMessage(msg))
        if (msg.senderId === selectuser._id) {
      socket.emit("markAsRead", {
        senderId: msg.senderId,
        receiverId: msg.receiverId,
      });
      console.log(msg.senderId)
      console.log(msg.receiverId)
    }
  }
};
       
  


    

  const handleMessagesRead = (data) => {
  dispatch(markMessagesRead(data));
};
    socket.on("newMessage", handleNewMessage);
   socket.on("messagesRead", handleMessagesRead);
    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("messagesRead", handleMessagesRead);
    };
  }, [socket,  dispatch]);

  return null;
};

export default useGetRealTimeMessage;*/









import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, markMessagesRead } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
  const dispatch = useDispatch();

  const { socket } = useSelector((state) => state.socket);
  const messages = useSelector((state) => state.messageuser.messageuser);
  const selectedUser = useSelector((state) => state.selectedUser.selectedUser);
  const currentUser = useSelector((state) => state.auth.user);

  // NEW MESSAGE LISTENER
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (msg) => {
      // sirf current chat ke messages handle karo
      const isCurrentChat =
        msg.senderId === selectedUser?._id ||
        msg.receiverId === selectedUser?._id;

      if (!isCurrentChat) return;

      dispatch(addMessage(msg));

      // IMPORTANT:
      // agar message mujhe aaya hai (i am receiver), tab mark as read
      
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, selectedUser, currentUser, dispatch]);

  // READ RECEIPT LISTENER
  useEffect(() => {
    if (!socket) return;

    const handleMessagesRead = (data) => {
      dispatch(markMessagesRead(data));
      console.log("📩 messagesRead received:", data);
    };

    socket.on("messagesRead", handleMessagesRead);

    return () => {
      socket.off("messagesRead", handleMessagesRead);
    };
  }, [socket, dispatch]);

  // AUTO MARK AS READ WHEN CHAT OPENS
  useEffect(() => {
    if (!socket || !selectedUser || !currentUser) return;

    socket.emit("markAsRead", {
      senderId: selectedUser._id,
      receiverId: currentUser._id,
    });
  }, [socket, selectedUser, currentUser]);

  return null;
};

export default useGetRealTimeMessage;