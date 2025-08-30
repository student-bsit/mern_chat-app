import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: []
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
      state.loading = false;
    }

  }
});

export const { setMessages } = messageSlice.actions;
export default messageSlice.reducer;
