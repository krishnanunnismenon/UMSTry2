import React, { useEffect } from 'react'
import { useSelector , useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from '../../../constants/axios'
import { clearUser, setUser } from '../../redux/slices/userSlice'

function HomeCom() {
    const userDetails = useSelector((state)=>state?.user?.userDetails)
    const navigate = useNavigate()
    const dispatch = useDispatch()


   
    const handleLogout = ()=>{
        dispatch(clearUser());
        navigate('/login')
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
    
    <div className="flex justify-center mb-4">
      <img
        src={`http://localhost:4545${userDetails?.image}`}
        alt="Profile Photo"
        className="w-32 h-32 rounded-full object-cover"
      />
    </div>

    
    <h1 className="text-2xl font-semibold text-center mb-4">
      {userDetails?.name}
    </h1>

    
    <div className="flex justify-around">
      <button
        onClick={() => navigate('/edit-profile')}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
      >
        Edit Profile
      </button>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
    
  </div>
</div>

  )
}

export default HomeCom
