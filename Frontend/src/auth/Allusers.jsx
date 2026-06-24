import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import MessageProfile from "./MessageProfile";
import {useDispatch} from "react-redux"
import {setSelectedUser,setOnlineUsers} from "../../redux/selectedUserSlice"
import { useSelector } from "react-redux";
import { setAuthUser } from "../../redux/authSlice";
import {Link, useNavigate} from "react-router"
import { setMessageUser } from "../../redux/messageSlice";
import { IoMdMenu } from "react-icons/io"
import { FaArrowLeft } from "react-icons/fa6";




const Allusers = () =>{
     const[search,setSearch]=useState("")
     const[searchdata,setSearchData]=useState([])
     const[dp,setDp]=useState(false)
     const user=useSelector((state)=>state.auth.user)
    const [choooseUser, setChooseUser] = useState();
  const {onlineUsers}=useSelector((state)=>state.selectedUser)
    const {selectedUser}=useSelector((state)=>state.selectedUser)
const navigate=useNavigate()
 const isOnline=onlineUsers.includes((user._id))
  console.log(isOnline)
 // const isOnline = onlineUsers?.some(
  //(id) => String(id).trim() === String(user._id).trim()
//);
  
  console.log(onlineUsers)
    const dispatch=useDispatch()
  
    const[userList,setUserList]=useState([])
   
  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSearch(value);

    const q = value.trim().toLowerCase();

    const searching = searchdata.filter((item) =>
      item.fullName.toLowerCase().includes(q)
    );

    setUserList(searching);
    console.log(userList)
  
  };
    useEffect(() => {
        const fetchUsers=async()=>{
            try{
                const response=await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/otherUsers`,
                    {withCredentials:true}
                )
                setUserList(response.data.users)
                setSearchData(response.data.users)
                console.log(response.data.users)

                
            }
            catch(error){
                console.log(error)
            }

        

        }

        
        fetchUsers()
    },[])

    const selectUser=async(userId)=>{
      try{
        const response=await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/selectedUser/${userId}`,{withCredentials:true})
        // setChooseUser(response.data.selectedUser)
        dispatch(setSelectedUser(response.data.selectedUser))
        dispatch(setMessageUser());
        console.log(response.data.selectedUser)
          if (window.innerWidth < 640) {
    navigate(`/messageProfile/${userId}`);
      }}
      catch(error){
        console.log(error)
      }
    }
     



    //dpbox

    
  
  

  return (
    <div className=" w-screen sm:w-[30vw]  h-screen bg-purple-200 border-r border-gray-200">
      {/* Header */}
   { dp? 
  
   <div className="h-[100%] w-[100%] bg-pink-400">
    <div className="upperbox w-[100%] h-[15vh] border-b-4 border-pink-600 flex items-center  ">
       <h2 className="text-white ml-0 font-semibold  text-3xl"onClick={()=>setDp(!dp)}><FaArrowLeft /></h2>
      <h1 className=" w-full font-semibold text-3xl  text-center">{selectedUser.fullName}</h1>
     
    </div>
    <div className="h-[85vh] w-[100%] flex  justify-center">
      <img className="w-[100%] hover:w-[80%] hover-border-4 hover:border-purple-800 mt-[10vh] h-[60vh]" src={selectedUser.profilePhoto}/>

   </div>
   </div>
  
   
   : 
   
   
   <><div className="bg-purple-500 text-white p-4">           
      
        <h1 className="text-xl h-[5vh] font-semibold">Chats</h1>
      </div>

      {/* Search */}
      <div className="p-3 bg-gray-100 flex gap-3">
        
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search ..."
          className="w-full sm:w-[90%] md:w-[70%] lg:w-[50%] p-3 border rounded-lg shadow focus:ring-2 focus:ring-red-400 outline-none text-sm sm:text-base"
        />
       <Link className="ml-40 mt-2  text-4xl text-black" to="/editProfile"><  IoMdMenu /></Link>
      
      </div>

      {/* User List */}
      <div className="overflow-y-auto h-[76vh] ">
        {userList.map((user) => (
          <div  key={user._id}  className="flex items-center px-4 py-3 hover:bg-purple-300 cursor-pointer border-b border-purple-200">
            <img onClick={()=>dispatch(setSelectedUser(user),setDp(!dp))}
              src={user.profilePhoto}
              className="w-12 h-12 rounded-full object-center"
            />

            <div onClick={()=>selectUser(user._id)}  className="flex-1 ml-4">
              <div className="flex justify-between items-center">
                <h3 className="font-stretch-50% text-gray-900">
                  {user.fullName}
                </h3>
                <span className="text-xs text-gray-500">
                    {onlineUsers.includes(user._id)?<p className="text-green-400" >online</p>:<p className="text-red-400">offline</p>}
                </span>
              </div>

              <div className="flex justify-between items-center mt-1">
                <p className="text-sm text-gray-500 truncate max-w-[180px]">
                  {user.lastMessage}
                </p>

                {user.unread > 0 && (
                  <span className="bg-green-500 text-white text-xs font-semibold rounded-full min-w-[22px] h-[22px] flex items-center justify-center">
                    {user.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div></> }
    </div>
  );
};

export default Allusers;