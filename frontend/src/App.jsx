import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import useGetCurrentUser from './customHooks/getCurrUser'
import { useDispatch, useSelector } from 'react-redux'
import Home from './pages/Home'
import Profile from './pages/Profile'
import useGetOthertUsers from './customHooks/getOtherUsers'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { serverUrl } from './main'
import { setOnlineUsers, setSocket } from './redux/userSlice'

const App = () => {
  useGetCurrentUser();
  useGetOthertUsers();
  const { userData, socket, onlineUsers, loading } = useSelector(state => state.user)
  const dispatch = useDispatch();



  useEffect(() => {
    if (!userData) {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
      return;
    }


    const socketio = io(serverUrl, {
      query: { userId: userData._id }
    });

    dispatch(setSocket(socketio));

    socketio.on("getOnlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
    });

    return () => {
      socketio.close();
    };
  }, [userData]);



  if (loading) return <div>Loading...</div>;
  return (
    <Routes>

      <Route path='/login' element={!userData ? <Login /> : <Navigate to="/" />} />
      <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to="/" />} />
      <Route path='/' element={userData ? <Home /> : <Navigate to="/login" />} />
      <Route path='/profile' element={userData ? <Profile /> : <Navigate to="/login" />} />

    </Routes>

  )

}

export default App
