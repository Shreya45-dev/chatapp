 
 import React, { useState,useRef } from "react";
 import axios from "axios";
 import { useSelector,useDispatch } from "react-redux";
 import { useEffect } from "react";
import { setMessageUser,addMessage } from '../../redux/messageSlice';
import useGetRealTimeMessage from '../../hooks/useGetRealTimeMessage';
import { Link } from "react-router";
import  image from"../assets/image.png"
import { FaArrowLeft } from "react-icons/fa6";
import { IoCheckmarkDone } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";
const MessageProfile=()=>{

  const { socket } = useSelector((state) => state.socket);
  useGetRealTimeMessage()
    const dispatch=useDispatch()
    const scroll=useRef();
    const onlineusers=useSelector((state)=>state.selectedUser.onlineUsers)
    console.log(onlineusers)
    const user=useSelector((state)=>state.auth.user)
    console.log(user.gender)
  const message = useSelector(
    (state) => state.messageuser.messageuser
  );
  
     const selectedUser=useSelector((state)=>state.selectedUser.selectedUser)

  //const [message, setMessage] = useState([]);
  const[newMessage,setNewMessage]=useState("")
  useEffect(() => {
  scroll.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [message]);
  
    
       useEffect(() => {

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/message/receiveMessage/${selectedUser?._id}`,
        { withCredentials: true }
      );

      dispatch(setMessageUser(response.data.conversation.messages));

   if (socket && selectedUser?._id && user?._id) {
  socket.emit("markAsRead", {
    senderId: selectedUser._id,
    receiverId: user._id,
  });}
}
catch(err){
  console.log(err)
}
  }

  fetchMessages();

}, [selectedUser, socket]);

  const submitHandler=async(e)=>{
    e.preventDefault();
    try{
        const response=await axios.post(`${import.meta.env.VITE_API_URL}/api/message/sendMessage/${selectedUser?._id}`,{message:newMessage},{
            withCredentials: true
        });
        
       //setMessage([...])
      dispatch(addMessage(response.data.newMessage));
        
        setNewMessage("");
    
    } catch (error) {
  
        console.error("Error sending message:", error);
         alert("message fetch krne me galti aarhi hai")
    }
  }

  
  const handleSend = () => {
    if (!message.trim()) return;

  
    setMessage("");
  };


  return (
    <div className="w-screen flex flex-col h-screen sm:w-[70vw] bg-pink-200">
      
      <div className="flex items-center justify-between px-4 py-3 bg-purple-500 text-white shadow">
        <div className="flex items-center gap-3">
          <img
            src={selectedUser?.profilePhoto || "https://i.pravatar.cc/150?img=5"}
            alt="user"
            className="w-12 h-12 rounded-full"
          />
        

          <div>
            <h2 className="font-medium">{selectedUser?.fullName}</h2>
         
          </div>
        </div>

        <div className="flex gap-4 text-xl">
          <button>📞</button>
          <button>🎥</button>
          <button>⋮</button>
            <Link className="block sm:hidden " to="/allusers"><h1><FaArrowLeft /></h1></Link>
        </div>
      </div>

      
      <div
        className="flex-1 overflow-y-auto p-4  space-y-3"
        
        style={{
          backgroundImage:
          user.gender==="female"
           // "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa6LxZQUAygumIXciQxELPiXxCl-dF3LZ_iEBaXC_FD1GjCDnjxLXP6oE&s')"
           ?"url('https://img.magnific.com/premium-photo/anime-girl-galaxy-background_776894-198525.jpg')"
         //  :"url('https://img.freepik.com/premium-photo/cute-anime-boy-wallpaper_776894-111002.jpg?w=360')",
        : "url('https://img.magnific.com/premium-photo/cute-anime-boy-wallpaper_776894-111014.jpg?semt=ais_hybrid&w=740&q=80')",
      
       //  backgroundSize: "cover",
   // backgroundPosition: "center",
   // backgroundSize: "px 300px",
   //backgroundSize: "contain",
  //  backgroundRepeat: "no-repeat", 
  backgroundSize: "cover",
backgroundRepeat: "no-repeat",
backgroundPosition: "center",
   }}
      >

        {message.length===0 ? <>Start messaging</>:<>
        {message.length>0 && message.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.senderId === user._id
                ?"justify-end":"justify-start" 
          
            }`}
          >
            
            <div
              className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg shadow ${
                msg.sender === "me"
                  ? "bg-[#DCF8C6]"
                  : "bg-white"
              }`}
            >
              <p className="text-gray-800">{msg.message}</p>
              <div className="text-right text-[10px] text-gray-500 mt-1">
  {new Date(msg.createdAt).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  })}
</div>
            

              <div className="text-right  text-[10px] text-gray-500 mt-1">
                {msg.time}

   {/*{msg.senderId === user._id &&
  (msg.isRead ? (
    <IoCheckmarkDone className="text-blue-500 text-lg" />
  ) : onlineusers.includes(selectedUser._id) ? (
    <IoCheckmarkDone className="text-gray-500 text-lg" />
  ) : (
    <IoCheckmark className="text-gray-500 text-lg" />
  ))}*/}
  {msg.senderId === user._id &&
  (msg.isRead ? (
    <IoCheckmarkDone className="text-blue-500 text-lg" />
  ) : (
    <IoCheckmark className="text-gray-500 text-lg" />
  ))}
              </div>
            </div>
          </div>
        ))}
        <div ref={scroll}></div> </>  }
      </div>

        
      <div className="bg-pink-300 p-3 flex items-center gap-3">
        <button className="text-2xl text-gray-500">😊</button>
         <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
         
          className="flex-1 px-4 py-2 rounded-full border bg-white focus:outline-none"
        />

        

        <button
          type="submit"
          className="bg-[#25D366] text-white p-3 rounded-full hover:bg-[#20ba5a]"
        >
          ➤
        </button></form>
      </div>
    </div>
  );
};


    
export default MessageProfile
/*import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMessageUser, addMessage } from "../../redux/messageSlice";
import useGetRealTimeMessage from "../../hooks/useGetRealTimeMessage";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa6";
import { IoCheckmarkDone, IoCheckmark } from "react-icons/io5";

const MessageProfile = () => {
  const dispatch = useDispatch();
  const scroll = useRef();

  const { socket } = useSelector((state) => state.socket);
  const onlineusers = useSelector((state) => state.selectedUser.onlineUsers);
  const user = useSelector((state) => state.auth.user);
  const selectedUser = useSelector((state) => state.selectedUser.selectedUser);

  const message = useSelector((state) => state.messageuser.messageuser);
  const [newMessage, setNewMessage] = useState("");

  useGetRealTimeMessage();

  // 🔽 scroll to bottom
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message.length]);

  // 🔽 fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/message/receiveMessage/${selectedUser?._id}`,
          { withCredentials: true }
        );

        dispatch(setMessageUser(response.data.conversation.messages));

        // mark as read
        if (socket && selectedUser?._id && user?._id) {
          socket.emit("markAsRead", {
            senderId: selectedUser._id,
            receiverId: user._id,
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (selectedUser?._id) {
      fetchMessages();
    }
  }, [selectedUser, socket]);

  // 🔽 send message
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/message/sendMessage/${selectedUser?._id}`,
        { message: newMessage },
        { withCredentials: true }
      );

      dispatch(addMessage(response.data.newMessage));
      setNewMessage("");
    } catch (error) {
      console.error(error);
      alert("Message send error");
    }
  };

  return (
    <div className="w-screen flex flex-col h-screen sm:w-[70vw] bg-pink-200">

      
      <div className="flex items-center justify-between px-4 py-3 bg-purple-500 text-white shadow">
        <div className="flex items-center gap-3">
          <img
            src={selectedUser?.profilePhoto || "https://i.pravatar.cc/150?img=5"}
            className="w-12 h-12 rounded-full"
          />
          <h2 className="font-medium">{selectedUser?.fullName}</h2>
        </div>

        <Link className="sm:hidden" to="/allusers">
          <FaArrowLeft />
        </Link>
      </div>

  
      <div
        className="flex-1 overflow-y-auto p-4 space-y-3"
        style={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {message.length === 0 ? (
          <p className="text-center text-gray-500">Start messaging</p>
        ) : (
          message.map((msg) => (
            <div
              key={msg._id}
              className={`flex ${
                msg.senderId === user._id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg shadow ${
                  msg.senderId === user._id
                    ? "bg-[#DCF8C6]"
                    : "bg-white"
                }`}
              >
                <p>{msg.message}</p>

        
                <div className="text-right text-[10px] text-gray-500 mt-1">
                  {new Date(msg.createdAt).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>

                
                {msg.senderId === user._id && (
                  <div className="flex justify-end">
                    {msg.isRead ? (
                      <IoCheckmarkDone className="text-blue-500 text-lg" />
                    ) : onlineusers.includes(selectedUser._id) ? (
                      <IoCheckmarkDone className="text-gray-500 text-lg" />
                    ) : (
                      <IoCheckmark className="text-gray-500 text-lg" />
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}

        <div ref={scroll} />
      </div>

  
      <form
        onSubmit={submitHandler}
        className="bg-pink-300 p-3 flex items-center gap-3"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 px-4 py-2 rounded-full border bg-white"
        />

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-full"
        >
          ➤
        </button>
      </form>
    </div>
  );
};

export default MessageProfile;
*/


/* import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessageUser, addMessage } from "../../redux/messageSlice";
import useGetRealTimeMessage from "../../hooks/useGetRealTimeMessage";

const MessageProfile = () => {
  useGetRealTimeMessage();

  const dispatch = useDispatch();
  const scroll = useRef();

  const selectedUser = useSelector(
    (state) => state.selectedUser.selectedUser
  );

  const messages = useSelector(
    (state) => state.messageuser.messageuser
  );

  const [newMessage, setNewMessage] = useState("");

  // FETCH messages when user changes
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/message/receiveMessage/${selectedUser?._id}`,
          { withCredentials: true }
        );

        dispatch(setMessageUser(res.data.conversation.messages));
      } catch (err) {
        console.log(err);
      }
    };

    if (selectedUser?._id) {
      fetchMessages();
    }
  }, [selectedUser, dispatch]);

  // AUTO SCROLL
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // SEND MESSAGE
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:3000/api/message/sendMessage/${selectedUser?._id}`,
        { message: newMessage },
        { withCredentials: true }
      );

      dispatch(addMessage(res.data.newMessage));
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-screen flex flex-col h-screen sm:w-[70vw] bg-[#efeae2]">

    
      <div className="flex items-center justify-between px-4 py-3 bg-[#075E54] text-white">
        <div className="flex items-center gap-3">
          <img
            src={selectedUser?.profilePhoto}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2>{selectedUser?.fullName}</h2>
          </div>
        </div>
      </div>

      
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex ${
              msg.senderId === selectedUser?._id
                ? "justify-start"
                : "justify-end"
            }`}
          >
            <div className="px-4 py-2 bg-white rounded-lg shadow max-w-xs">
              {msg.message}
            </div>
          </div>
        ))}

        <div ref={scroll}></div>
      </div>

    
      <form
        onSubmit={submitHandler}
        className="p-3 flex items-center gap-2 bg-gray-100"
      >
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 px-4 py-2 rounded-full"
          placeholder="Type message..."
        />

        <button className="bg-green-500 px-4 py-2 text-white rounded-full">
          ➤
        </button>
      </form>
    </div>
  );
};

export default MessageProfile; */