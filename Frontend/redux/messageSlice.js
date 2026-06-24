/*import {createSlice} from "@reduxjs/toolkit";

const messageSlice=createSlice({
    name:"messageuser",
    initialState:{
        messageuser:[],
        
    },
    reducers:{
        setMessageUser:(state,action)=>{
            state.messageuser=action.payload || [];
        },
    

    }
});

export const {setMessageUser}=messageSlice.actions;
export default messageSlice.reducer;

*/


import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "messageuser",
  initialState: {
    messageuser: [],
  },
  reducers: {
    setMessageUser: (state, action) => {
      state.messageuser = action.payload || [];
    },

    addMessage: (state, action) => {
      state.messageuser.push(action.payload);
    },

    clearMessages: (state) => {
      state.messageuser = [];
    },
  },
});

export const { setMessageUser, addMessage, clearMessages } =
  messageSlice.actions;

export default messageSlice.reducer;