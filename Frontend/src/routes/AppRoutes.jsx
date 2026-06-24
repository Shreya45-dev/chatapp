import React from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Userlogin from '../auth/Userlogin'
import UserRegister from '../auth/UserRegister'
import Home from '../auth/Home'
import Allusers from "../auth/Allusers"
import MessageProfile from '../auth/MessageProfile'
import Reset from '../auth/Reset'
import Editpage from '../auth/Editpage'



const AppRoutes=()=>{

    return(
        <Router>
            <Routes>
                <Route path="/user/login" element={<Userlogin/>} />
                <Route path="/" element={<UserRegister/>}/>
                <Route path="/Home" element={<Home/>}/>
                <Route path="/allusers"  element={<Allusers/>}/>
                <Route path="/messageProfile/:id" element={<MessageProfile/>}/>
                <Route path="/resetPassword/:token" element={<Reset/>}/>
                <Route path="/editProfile" element={<Editpage/>}/>
                
                
                

                
             
                
                
            </Routes>
        </Router>
        
    )

}
export default AppRoutes
