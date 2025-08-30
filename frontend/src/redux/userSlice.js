import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    otherUsers:null,
    selectedUser:null,
    socket:null,
    onlineUsers:null,
    searchData:null,
    loading: true
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
      state.loading = false;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
      state.loading = false;
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
      state.loading = false;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
      state.loading = false;
    },
    setSearchData: (state, action) => {
      state.searchData = action.payload;
      state.loading = false;
    },
    clearUserData: (state) => {
      state.userData = null;
      state.loading = false;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { setUserData, setOtherUsers,setSearchData,setSelectedUser,setSocket,setOnlineUsers,clearUserData, setLoading } = userSlice.actions;
export default userSlice.reducer;
