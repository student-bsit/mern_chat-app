import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../main';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSelectedUser, setUserData } from '../redux/userSlice';

const Login = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handlelogin = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/login`, {
        email,
        password
      }, { withCredentials: true })

      dispatch(setUserData(result.data.user));
      dispatch(setSelectedUser(null));
      navigate("/")
      setEmail("");
      setPassword("");
      setLoading(false)
      setError("");


    } catch (error) {
      console.log(error)
      setLoading(false)
      setError(error.response.data.message)
    }
  }

  return (
    <div className='w-full h-[100vh] bg-slate-200 flex items-center justify-center'>

      <div className='w-full max-w-[500px] h-[600px] bg-slate-50 rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[30px]'>

        <div className='w-full h-[200px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center justify-center'>

          <h1 className='text-gray-600 font-bold text-[30px] '>
            welcome to <span className='text-white'>chatly</span>
          </h1>

        </div>

        <form className='w-full flex flex-col items-center gap-[20px]' onSubmit={handlelogin}>

          <input type="email" name="userEmail" placeholder='email' autoComplete="off" className='w-[90%] h-[50px] outline-none border-2  border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg text-gray-700 text-[19px]' value={email} onChange={(e) => setEmail(e.target.value)} />

          <div className='w-[90%] h-[50px]  border-2  border-[#20c7ff] overflow-hidden rounded-lg shadow-gray-200 shadow-lg relative'>

            <input type={`${show ? "text" : "password"}`} autoComplete="new-password" placeholder='password' className='w-full h-full px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg text-gray-700 text-[19px]' value={password} onChange={(e) => setPassword(e.target.value)} />

            <span className='absolute top-[10px] right-[20px] text-[19px] text-[#20c7ff] font-semibold cursor-pointer' onClick={() => setShow(prev => !prev)}>{`${show ? "hidden" : "show"}`}</span>
          </div>

          {error && <p className='text-red-500'>{"*" + error}</p>}

          <button className='px-[20px] py-[10px] bg-[#20c7ff] rounded-2xl shadow-gray-400 shadow-lg text-[20px] mt-[20px] font-bold hover:shadow-inner' disabled={loading}>{`${loading ? "Loading..." : "login"}`}</button>

          <p className='cursor-pointer' onClick={() => navigate("/signup")}>Already have an account <span className='text-[#20c7ff] text-[bold]'>Sign up</span></p>

        </form>

      </div>

    </div>
  )
}

export default Login
