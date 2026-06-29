
import React, { useState,useRef } from 'react'
import axios from 'axios'
import {Link, useNavigate} from "react-router-dom"
const UserRegister = () => {
const navigate=useNavigate()
const form = useRef();
  const [first, setfirst] = useState("")
  const[second,setsecond]=useState("");
  const[email,setemail]=useState("");
  const[password,setpassword]=useState("")
  const[hello,sethello]=useState(false)
  const[gender,setgender]=useState("")
  const[phonenumber,setphonenumber]=useState("")
  const[profilePhoto,setProfilePhoto]=useState(null)
  const[box,setBox]=useState(true)
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    console.log(newOtp.join("")); // Complete OTP in one variable
  };

  const submithandler=async(e)=>{
  
   e.preventDefault()
    const formData = new FormData();
const fullName=first+" "+second
formData.append("fullName", fullName);
formData.append("email", email);
formData.append("profilePhoto", profilePhoto);
formData.append("gender", gender);
formData.append("password", password);
formData.append("phonenumber", phonenumber);


   try{
    const response=await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/user/register`,
      formData
      
      
    ,{
      withCredentials:true,
        
    })
    console.log(response.data.message)
    alert(response.data.message)
    navigate("/user/login")

    
  }
  catch(error){
    console.log(error)
    alert("registration ❌")
   // console.log("Status:", error.response.status);
   // console.log("Data:", error.response.data);
  }
}
const register=async()=>{


    
  try{const response=await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/sendOtp`,
      {email}
      
      
    ,{
      withCredentials:true,
        
    })
    console.log(response.data.message)
    setBox(false)
  
    
    
  }
  catch(error){
    console.log(error)
    alert("otp failed ❌")
    console.log("Status:", error.response.status);
    console.log("Data:", error.response.data);
     console.log("Full Error:", error);
  
  }
}
   

  
  return (
    <>
    
    <div className='flex relative justify-center items-center bg-gradient-to-br from-blue-300 via-blue-600 to-yellow-400 h-screen w-screen'> 
    {box?<div className=' h-[600px] w-[340px] md:w-[440px] border-2 rounded-xl bg-blue-200 border-zinc-500 flex items-center justify-center '>
      <div className="h-[600px] md:w-[420px] w-[320px] ">
      <i className='text-4xl font-bold mt-5 mb-5 ml-3 '>Sign Up</i>  
      <h1 className='mb-3 ml-3'>Please fill in this form to create account</h1>
    <form  ref={form} onSubmit={submithandler}  > 
      <h1 className=' font-semibold'>First Name</h1>
      <input type='text' className='bg-slate-200 w-full mt-2 mb-2 'name="first" value={first} onChange={(e)=>setfirst(e.target.value)} />
      <h1 className=' font-semibold'>Second Name</h1>

      <input type='text' className='bg-slate-200 w-full mt-2 mb-2 ' value={second} onChange={(e)=>setsecond(e.target.value)} />
      <h1 className=' font-semibold'>Email</h1>
      
      <input type='email' className='bg-slate-200 w-full mt-2 mb-2 ' name="email" value={email} onChange={(e)=>setemail(e.target.value)} />
       <h1 className='font-semibold'>ProfilePhoto</h1>
      <input type="file" onChange={(e) => setProfilePhoto(e.target.files[0])}/>
      <h1 className=' font-semibold'>Gender</h1>
      <input type='text' className='bg-slate-200 w-full mt-2 mb-2 ' value={gender} onChange={(e)=>setgender(e.target.value)} />
      <h1 className=' font-semibold'>Password</h1>
      <input type='Password' className='bg-slate-200 w-full mt-2 mb-2 ' value={password} onChange={(e)=>setpassword(e.target.value)} />
      <h1 className=' font-semibold'>Phone Number</h1>
      <input type='number' className='bg-slate-200 w-full mt-2 mb-2 ' value={phonenumber} onChange={(e)=>setphonenumber(e.target.value)} />
       <h1>If Already Registered ?<Link className="text-green-900 font-semibold" to="/user/login" >Login</Link></h1>
    
     <button type="submit" className='bg-blue-500 h-6 w-full'>Sign Up</button>
      
    
      
    </form>
  </div>
    
  </div>:<div className="h-60 w-72 bg-white relative rounded-2xl bg-gradient-to-br from-pink-500 via-purple-400 to-purple-600 ">
    <button className="ml-60 h-8 p-1 w-10 border-2 rounded-xl bg-zinc-400" onClick={()=>setBox(true)}>X</button>
    <h1 className="w-full text-center mt-2 font-semibold text-2xl ">Enter Otp</h1>
     
    <div className='flex items-center justify-center h-32'>
      {otp.map((digit, index) => (
        <input
          key={index}
          value={digit}
          
          maxLength={1}
          onChange={(e) => handleChange(e.target.value, index)}
          className='w-[40px] h-[40px] text-center border-2  rounded-xl m-1'
          
        />
      ))}
    </div>
    <button className="h-8 w-24 p-1 rounded-xl ml-28 bg-purple-600 hover:bg-purple-800 " onClick={register}>Register</button>
   
    </div>}

      
    </div></>
  )}


export default UserRegister
