import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dp from '../assets/dp.png'
import { IoIosSearch } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import axios from 'axios'
import { serverUrl } from "../main";
import { useNavigate } from 'react-router-dom';
import { setOtherUsers, setSearchData, setSelectedUser, setUserData } from '../redux/userSlice';
import { useEffect } from 'react';

const Sidebar = () => {
    const { userData, otherUsers, onlineUsers, selectedUser, searchData } = useSelector(state => state.user)
    const [search, setSearch] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [input, setInput] = useState("");

    const handleLogout = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
            dispatch(setUserData(null))
            dispatch(setOtherUsers(null))
            navigate("/login")

        } catch (error) {
            console.log(error)
        }
    }

    const handleSearch = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/user/search?query=${input}`, { withCredentials: true })
            console.log(result.data)
            dispatch(setSearchData(result.data))

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (input) {
            handleSearch();
        }

    }, [input])

    return (
        <div className={`lg:w-[30%] w-full h-full overflow-hidden lg:block ${!selectedUser ? "block" : "hidden"} bg-slate-200 relative`}>


            <div className='w-[60px] h-[60px] bg-[#20c7ff] mt-[10px] rounded-full overflow-hidden flex justify-center items-center gap-[20px] text-gray-700  cursor-pointer shadow-gray-50  shadow-lg fixed bottom-[20px] left-[10px] z-[200] ' onClick={handleLogout}>
                <BiLogOutCircle className='w-[25px] h-[25px]' />

            </div>

            {input.length > 0 && <div className='flex absolute top-[250px] w-full h-[300px] bg-white overflow-y-auto flex-col items-center gap-[10px] pt-[20px] z-[150] shadow-lg'>
                {searchData?.map((user) => (
                    <div className='w-[95%] h-[70px] mt-[10px] flex items-center  gap-[20px]  px-[10px] py-[10px]  cursor-pointer hover:bg-[#78cae5] border-b-2 border-gray-400' onClick={() => {
                        dispatch(setSelectedUser(user))
                        setInput("")
                        setSearch(false)
                    }
                    }>

                        <div className='relative rounded-full shadow-gray-500 shadow-lg mt-[10px]'>
                            <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex items-center justify-center  cursor-pointer'>

                                <img src={user?.image || dp} alt="" className='h-[100%]' />

                            </div>
                            {onlineUsers?.includes(user._id) && <span className='w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#3aff20] '></span>}
                        </div>
                        <h1 className='text-gray-800 font-semibold text-20px]'>{user.name || user.userName}</h1>
                    </div>
                ))}
            </div>}

            <div className='w-full h-[300px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col  justify-center  px-[20px]'>

                <h1 className='text-white font-bold text-[25px]'>Chatly</h1>

                <div className='w-full flex justify-between items-center'>
                    <h1 className='text-gray-800 font-bold text-[25px]'>Hii , {userData.name}</h1>

                    <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex items-center justify-center shadow-gray-500 shadow-lg cursor-pointer' onClick={() => navigate("/profile")}>

                        <img src={userData?.image || dp} alt="" className='h-[100%]' />

                    </div>

                </div>

                <div className='w-full flex items-center  gap-[20px] overflow-auto py-[15px]'>

                    {!search && <div className='w-[60px] h-[60px] bg-white rounded-full overflow-hidden flex items-center justify-center shadow-gray-500 shadow-lg mt-[10px] cursor-pointer' onClick={() => setSearch(true)}>
                        <IoIosSearch className='h-[25px] w-[25px]' />
                    </div>}

                    {search &&
                        <form className='w-full h-[60px] shadow-gray-500 shadow-lg flex items-center gap-[10px] bg-white mt-[10px] rounded-full px-[20px] overflow-hidden relative '>
                            <IoIosSearch className='h-[25px] w-[25px]' />
                            <input type="text" placeholder='serach users...' className='w-full h-full p-[10x] text-[17px] outline-none border-0' onChange={(e) => setInput(e.target.value)} value={input} />
                            <RxCross2 className='h-[25px] w-[25px] cursor-pointer' onClick={() => setSearch(false)} />



                        </form>
                    }

                    {!search && otherUsers?.map((user) => (
                        onlineUsers?.includes(user._id) &&
                        <div className='relative rounded-full shadow-gray-500 shadow-lg mt-[10px]'>
                            <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex items-center  justify-center  cursor-pointer' onClick={() => dispatch(setSelectedUser(user))}>

                                <img src={user?.image || dp} alt="" className='h-[100%]' />

                            </div>
                            <span className='w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#3aff20] shadow-gray-500 shadow-lg'></span>
                        </div>
                    ))}

                </div>

            </div>

            <div className="w-full h-[50%] overflow-auto  flex flex-col gap-[20px] items-center mt-[20px] px-[10px]">

                {otherUsers?.map((user) => (

                    <div className='w-[95%] h-[60px] mt-[10px] rounded-full  flex  items-center gap-[20px] shadow-gray-500 bg-white shadow-lg cursor-pointer hover:bg-[#78cae5]' onClick={() => dispatch(setSelectedUser(user))}>

                        <div className='relative rounded-full shadow-gray-500 shadow-lg mt-[10px]'>
                            <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex items-center justify-center  cursor-pointer'>

                                <img src={user?.image || dp} alt="" className='h-[100%]' />

                            </div>
                            {onlineUsers?.includes(user._id) && <span className='w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#3aff20] shadow-gray-500 shadow-lg'></span>}
                        </div>
                        <h1 className='text-gray-800 font-semibold text-20px]'>{user.name || user.userName}</h1>
                    </div>
                ))}

            </div>


        </div>

    )
}

export default Sidebar
