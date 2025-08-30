
import React, { useRef } from 'react'
import dp from '../assets/dp.png'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';
import { RiEmojiStickerLine } from "react-icons/ri";
import { RiSendPlane2Fill } from "react-icons/ri";
import { FaRegImages } from "react-icons/fa6";
import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';
import SenderMessage from './SenderMessage';
import ReceiverMessage from './ReceiverMessage';
import { serverUrl } from '../main';
import axios from 'axios';
import { setMessages } from '../redux/messageSlice';
import { useEffect } from 'react';


function MessageArea() {
  const { selectedUser, userData, socket } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const image = useRef();
  const [showPicker, setShowPicker] = useState(false)
  const [input, setInput] = useState("");
  const { messages } = useSelector(state => state.message)

  let [frontendImage, setFrontendImage] = useState(null)
  let [backendImage, setBackendImage] = useState(null)


  const onEmojiClick = (emojiData) => {
    setInput(prevInput => prevInput + emojiData.emoji)
    setShowPicker(false)
  }

  const handleImage = (e) => {
    let file = e.target.files[0];
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.length == 0 && backendImage == null) {
      return
    }
    try {
      let formData = new FormData();
      formData.append("message", input)
      if (backendImage) {
        formData.append("image", backendImage)
      }
      const result = await axios.post(`${serverUrl}/api/message/send/${selectedUser._id}`, formData, { withCredentials: true })
      console.log(result.data)
      dispatch(setMessages([...messages, result.data]))
      setInput("");
      setFrontendImage(null)
      setBackendImage(null)

    } catch (error) {
      console.log(error)

    }
  }



  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (mes) => {
      dispatch(setMessages([...messages, mes]))
    });

    return () => {
      socket.off("newMessage");
    };

  }, [messages, setMessages]);




  return (
    <div className={`lg:w-[70%] w-full h-full flex border-l-2 ${selectedUser ? "flex" : "hidden"} lg:flex border-gray-300  bg-slate-200`}>


      {selectedUser &&

        <div className='w-full h-[100vh] flex flex-col'>

          <div className='w-full h-[100px] bg-[#1797c2] rounded-b-[30px] shadow-gray-400 shadow-lg flex items-center px-[20px] gap-[20px]'>


            <div className='cursor-pointer' onClick={() => dispatch(setSelectedUser(null))}>
              <IoIosArrowRoundBack className='w-[40px] h-[40px] text-white' />
            </div>

            <div className='w-[50px] h-[50px] bg-white rounded-full overflow-hidden flex items-center justify-center cursor-pointer shadow-gray-500 shadow-lg'>
              <img src={selectedUser?.image || dp} alt="" className='h-[100%]' />
            </div>


            <h1 className='text-white font-semibold text-[20px]'>
              {selectedUser?.name || selectedUser?.userName || "user"}
            </h1>
          </div>

          <div className='w-full h-[70%] flex flex-col py-[30px] px-[20px] overflow-auto gap-[20px]'>
            {showPicker &&
              <div className='absolute bottom-[120px] left-[20px] lg:left-[490px]'>
                <EmojiPicker width={250} height={350} className='shadow-lg z-[100]' onEmojiClick={onEmojiClick} />
              </div>
            }

            {messages && messages.map((mes) => (
              mes.sender == userData._id ? <SenderMessage image={mes.image} message={mes.message} /> : < ReceiverMessage image={mes.image} message={mes.message} />
            ))}



          </div>

        </div>

      }

      {!selectedUser &&
        <div className='w-full h-full flex flex-col justify-center items-center'>
          <h1 className='text-gray-700 font-bold text-[50px]'>Welcome to Chatly</h1>
          <span className='text-gray-700 font-bold text-[30px]'>Chat Friendly</span>

        </div>
      }

      {selectedUser && <div className='w-full lg:w-[70%] h-[100px] fixed bottom-[20px] flex items-center justify-center'>

        <img src={frontendImage} alt="" className='w-[80px] absolute bottom-[100px] right-[20%] rounded-lg shadow-gray-400 shadow-lg' />



        <form className='w-[95%] lg:w-[70%] h-[60px] bg-[rgb(23,151,194)] shadow-gray-400 shadow-lg rounded-full flex items-center gap-[20px] px-[20px]' onSubmit={handleSendMessage}>

          <div onClick={() => setShowPicker(prev => !prev)}>
            <RiEmojiStickerLine className='w-[25px] h-[25px] cursor-pointer text-white' />
          </div>

          <input type="file" accept='image/*' ref={image} hidden onChange={handleImage} />

          <input type="text" className='w-full h- bg-transparent outline-none border-0 text-[19px] text-white placeholder-white' placeholder='Message...' onChange={(e) => setInput(e.target.value)} value={input} />

          <div onClick={() => image.current.click()}>
            <FaRegImages className='w-[25px] h-[25px] cursor-pointer text-white' />
          </div>

          {(input.length > 0 || backendImage != null) && (
            <button>
              <RiSendPlane2Fill className='w-[25px] h-[25px] cursor-pointer text-white' />
            </button>
          )}


        </form>
      </div>}

    </div>
  )
}

export default MessageArea
