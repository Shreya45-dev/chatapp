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
  

markMessagesRead: (state, action) => {
  const { senderId, receiverId } = action.payload;

  state.messageuser = state.messageuser.map((msg) => {
    if (
    
      msg.senderId.toString() === senderId &&
      msg.receiverId.toString() === receiverId
    ) {
      return { ...msg, isRead: true };
    }
    return msg;
  });

  }


}})

export const { setMessageUser, addMessage, clearMessages,  markMessagesRead, } =
  messageSlice.actions;

export default messageSlice.reducer;