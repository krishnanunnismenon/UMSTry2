import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from '../../../constants/axios'
import {setAdmin} from '../../redux/slices/adminSlice'


function AdminLogin() {
  const [message, setMessage] = useState('')
  const [passvalid, setPassvalid] = useState(true)
  const [emailValid, setEmailValid] = useState(true)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSubmit = async(e)=>{
    e.preventDefault();

    const isEmail = email.trim()!=="" 
    const isPassword = password.trim()!=="";
    setEmailValid(isEmail)
    setPassvalid(isPassword)
    if(!isEmail || !isPassword){
      return;
    }
    const userCredentails = {email,password}

    try {

      const response = await axios.post("/admin/login",userCredentails)
      setMessage(response.data.message);
      if(response.status ===201){
        const admin = response.data.adminDetails
        const adminToken = response.data.adminToken
        localStorage.setItem("adminToken",adminToken)

        dispatch(setAdmin(admin))
        navigate('/admin/dashboard')
      }
      
    } catch (error) {
      
    }
  }

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col justify-center items-center">
  {message ? (
    <div className="text-red-500 text-lg mb-4 font-semibold">{message}</div>
  ) : (
    <div className="text-white text-4xl mb-8 font-bold">ADMIN PANEL</div>
  )}

  <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md">
    <div className="mb-6">
      {emailValid ? (
        <label className="block text-gray-300 text-sm font-semibold mb-2">EMAIL</label>
      ) : (
        <label className="block text-red-500 text-sm font-semibold mb-2">Email cannot be empty</label>
      )}
      <input
        type="text"
        className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>

    <div className="mb-6">
      {passvalid ? (
        <label className="block text-gray-300 text-sm font-semibold mb-2">PASSWORD</label>
      ) : (
        <label className="block text-red-500 text-sm font-semibold mb-2">Password cannot be empty</label>
      )}
      <input
        type="password"
        className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    <div className="text-center">
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
      >
        LOGIN
      </button>
    </div>
  </form>
</div>

  )
}

export default AdminLogin
