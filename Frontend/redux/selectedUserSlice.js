import {createSlice} from "@reduxjs/toolkit";

const selectedUserSlice=createSlice({
    name:"selectedUser",
    initialState:{
        selectedUser:null,
        onlineUsers:[],
    },
    reducers:{
        setSelectedUser:(state,action)=>{
            state.selectedUser=action.payload;
        },
        setOnlineUsers:(state,action)=>{
            state.onlineUsers=action.payload ||[]
        }
    

    }
});

export const {setSelectedUser,setOnlineUsers}=selectedUserSlice.actions;
export default selectedUserSlice.reducer;

