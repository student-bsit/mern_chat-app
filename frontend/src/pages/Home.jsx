import React from 'react'
import Sidebar from '../components/Sidebar'
import MessageArea from '../components/MessageArea'
import { useSelector } from 'react-redux'

import useGetMessages from '../customHooks/getMessages'

const Home = () => {
  let { selectedUser } = useSelector(state => state.user)
  useGetMessages();
  return (
    <div className='w-full h-[100vh] flex overflow-hidden '>
      <Sidebar />
      <MessageArea />
    </div>
  )
}

export default Home
