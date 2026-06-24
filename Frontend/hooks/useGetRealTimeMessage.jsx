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



import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessageUser } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.socket);
  const messages = useSelector((state) => state.messageuser.messageuser);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (msg) => {
  //  alert("📩 MESSAGE RECEIVED:", msg);

      if (msg.isSocket) {
        console.log("⚡ SOCKET MESSAGE");
      } else {
        console.log("💾 DB MESSAGE");
      }

      dispatch(setMessageUser([...messages, msg]));
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, messages, dispatch]);

  return null;
};

export default useGetRealTimeMessage;