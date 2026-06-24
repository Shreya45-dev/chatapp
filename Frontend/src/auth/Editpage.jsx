
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'


import axios from "axios"
import { setAuthUser } from '../../redux/authSlice'

const Editpage = () => {
const {user}=useSelector((state)=>state.auth)
const[profilePhoto,setProfilePhoto]=useState(null)
const dispatch=useDispatch();
const navigate=useNavigate()
console.log(user.profilePhoto)
const logout=async(req,res)=>{
  try{
  const response=await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/user/logout`,
    {withCredentials:true})
    alert('logout')
    dispatch(setAuthUser(null));
    navigate("/user/login");
  }
  catch(error){
    console.log(error)
  }
  
}
const submitHandler=async(e)=>{
    e.preventDefault();
    const formData=new FormData()
    formData.append("profilePhoto",profilePhoto)
      console.log("kya hua")
    try{
        const res=await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/editProfile`,formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            },withCredentials:true})
       console.log(res.data.message)
        dispatch(setAuthUser(res.data.user))
        console.log("hellokuko")
    }
    catch(error){
        console.log(error)
        alert("hey")
    }
}


const picture=(e)=>{
    const file=e.target.files?.[0]
    
    if(file) setProfilePhoto(file)
      
    
}

  return (
    
    <div className='h-screen w-screen bg-purple-400 flex flex-col'>
 <div className='h-[10vh] w-full'>
  <h1 className='text-center w-full font-semibold text-3xl '>Profile</h1>
  
      </div>
      <div className="h-[90vh]  w-full flex items-center justify-center">
      <div className="h-92 w-96  flex flex-col items-center" >
       <div className="h-44 w-44 rounded-full mt-5 bg-amber-800"><img className="h-44 w-44  rounded-full"src={user?.profilePhoto}/></div>
       <h1 className="w-full mt-4 text-center">{user.fullName}</h1>
      <form  onSubmit={submitHandler}>
      <input className="w-40 h-12  ml-28 border-2 rounded-xl p-2" type="file"  onChange={picture} placeholder="Change Photo"></input>
     
          <button type="submit" className="ml-40">Submit </button>
          <button className="w-full" onClick={logout}>Logout</button>
      </form>
    </div></div> </div>
  )
}

export default Editpage


/*

import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAuthUser } from "../../redux/authSlice";

const Editpage = () => {
  const { user } = useSelector((store) => store.auth);

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [preview, setPreview] = useState(user?.profilePhoto);

  const fileRef = useRef(null);
  const dispatch = useDispatch();

  const picture = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setProfilePhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("profilePhoto", profilePhoto);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/editProfile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      dispatch(setAuthUser(res.data.user));
      alert("Profile Updated");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#111b21] text-white">
      <div className="bg-[#202c33] p-4 text-xl font-semibold">
        Profile
      </div>

      <form onSubmit={submitHandler}>
        <div className="flex flex-col items-center mt-10">
          <img
            src={preview}
            alt="profile"
            onClick={() => fileRef.current.click()}
            className="w-40 h-40 rounded-full object-cover cursor-pointer border-4 border-green-500"
          />

          <p className="mt-3 text-gray-300">
            Tap photo to change
          </p>

          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            onChange={picture}
            className="hidden"
          />
        </div>

        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="bg-green-500 px-6 py-2 rounded-lg text-black font-semibold"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Editpage;*/


