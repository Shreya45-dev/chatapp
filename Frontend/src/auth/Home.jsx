import react, { useEffect } from 'react'
import Allusers from './Allusers'
import MessageProfile from './MessageProfile'
import {useSelector,useDispatch} from "react-redux"
import { setOnlineUsers } from '../../redux/selectedUserSlice'
import { setSocket } from '../../redux/socketSlice'
import {useNavigate} from 'react-router-dom'

import io from "socket.io-client"


const Home=()=>{
  
  const dispatch=useDispatch()
  const user = useSelector((state) => state.auth.user);
      console.log(user._id)
  useEffect(() => {
    if(user){
      const socket=io('http://localhost:3000',
      {
        query:{
          userId:user._id
        }

      })
      dispatch(setSocket(socket));
      socket.on('getOnlineUsers',(onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers))

      })
        socket.on("connect", () => {
  console.log("Connected:", socket.id);
});

socket.on("connect_error", (err) => {
  console.log("Connect Error:", err);
  
});
    }
  
   
  }, [user])
  const navigate=useNavigate()
  
   if (!user?._id) {
  navigate('/user/login');
}
  
  return (
    <div className='h-screen w-screen flex  bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500'>
      <Allusers/>
      <div className="hidden sm:block"><MessageProfile/></div>
      </div>
  )
}
export default Home