
import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { setAuthUser } from '../../redux/authSlice'
import { setMessageUser } from '../../redux/messageSlice'


const Userlogin = () => {
const navigate = useNavigate()
const dispatch = useDispatch()

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const forgetPassword=async()=>{
    try{
      const response=await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/resetPassword`,{email},
                {withCredentials:true}
      )
      alert("send reset password successfully")
      
  }
  catch(error){
    console.log(error)
  }}
  const submithandle = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(
       `${import.meta.env.VITE_API_URL}/api/auth/user/login`,
        { email, password },
        { withCredentials: true }
      )

      dispatch(setAuthUser({
...response.data.user,

}));
setMessageUser(null)
      navigate("/Home")

    } catch (error) {
      console.log(error)
      alert("Login failed ❌")
        }
    }

    return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
            
      <div className="bg-white/10 h-96  backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-[400px] border border-white/20">
                
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back 👋
                </h1>

        <form onSubmit={submithandle} className="flex flex-col gap-2">

          {/* Email */}
                    <div>
            <label className="text-white font-semibold">Email</label>
                        <input
              type="email"
              placeholder="Enter your email"
              className="mt-2 w-full p-3 py-3 rounded-2xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
                        />
                    </div>

          {/* Password */}
                    <div>
            <label className="text-white font-semibold">Password</label>
                        <input
              type="password"
              placeholder="Enter your password"
              className="mt-2 w-full p-3 rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
                        />
                    </div>

          {/* Register link */}
          <p className="text-white text-sm text-center">
            Don’t have an account?{" "}
            <Link
              to="/user/register"
              className="text-yellow-300 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>

          {/* Button */}
                    <button
                        type="submit"
            className="bg-white text-indigo-600 font-bold py-5 rounded-xl hover:bg-indigo-100 transition duration-300 shadow-lg"
                    >
            Login 🚀
                    </button>

                </form>
            </div>
            <h1 onClick={forgetPassword}>forget password</h1>

        </div>
    )
}

export default Userlogin

