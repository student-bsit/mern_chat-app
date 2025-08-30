import React from 'react'
import dp from '../assets/dp.png'
import { useRef } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SenderMessage = ({ image, message }) => {
    let scroll = useRef();
    const { userData } = useSelector(state => state.user)
    const navigate = useNavigate();

    useEffect(() => {
        scroll?.current.scrollIntoView({ behavior: "smooth" })
    }, [message, image])

    const handleImageScroll = () => {
        scroll.current.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <div className='flex items-start gap-[10px]'>
            <div ref={scroll} className='w-fit max-w-[500px] px-[20px] py-[10px] bg-[rgb(23,151,194)] text-white text-[19px] rounded-tr-none rounded-2xl relative right-0 ml-auto shadow-gray-400 shadow-lg flex flex-col gap-[10px]' >

                {image && <img src={image} alt="" className='w-[150px] rounded-lg' onLoad={handleImageScroll} />}
                {message && <span>{message}</span>}

            </div>

            <div className='w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center bg-white cursor-pointer shadow-gray-500 shadow-lg' onClick={() => navigate("/profile")}>
                <img src={userData.image || dp} alt="" className='h-[100%]' />
            </div>

        </div>
    )
}

export default SenderMessage
