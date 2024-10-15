import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../../constants/axios'
import { setUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

function EditCom() {
    const dispatch = useDispatch();
    const userDetails = useSelector((state)=>state.user.userDetails)
    const navigate = useNavigate()
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [image,setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState('');
    const [update,setUpdate] = useState(false)
    const [showMessage,setShowMessage] = useState(false)
    const [emailValid,setEmailValid] = useState(true)
    const [nameValid,setNameValid] = useState(true)


    useEffect(()=>{
      console.log('rerendered');
      
        const fetchUserDetails = async()=>{
            try {
                const response = await axios.get('/getUserDetails');
                if(response.status===201){
                  console.log(response);
                  
                    dispatch(setUser(response.data.userDetails))
                    
                }else{
                    
                    navigate('/login')
                }
            } catch (error) {
                
            }
        }
        if(!userDetails){
            fetchUserDetails();
        }else{
            setName(userDetails.name)
            setEmail(userDetails.email)
            setImagePreview(`http://localhost:4545${userDetails.image}`)
        }

        if(update){
          setShowMessage(true);
          const timer = setTimeout(()=>{
            setShowMessage(false);
          },1000)
          return()=> clearTimeout(timer)
        }
    },[userDetails,update])

    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        if(file){
            setImage(file);
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const validateEmail = (email)=>{
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return pattern.test(email)
    }

    

    const handleSubmit = async(e)=>{
      e.preventDefault();
        const isEmailValid = validateEmail(email);
        const isNameValid = name.trim() !== "";

        setEmailValid(isEmailValid)
        setNameValid(isNameValid)

        if(!isEmailValid || !isNameValid){
          return
        }

        const formData = new FormData();
        formData.append('name',name)
        formData.append('email',email)
        if(image){
            formData.append('image',image);
        }
        try {
            const response = await axios.put('/updateProfile',formData);
            dispatch(setUser(response.data.userDetails));
            if(response){
                setUpdate(true)
               
            }else{
                setUpdate(false)
                alert('this user already exist')
            }
        } catch (error) {
            console.log(error.message);
            alert("error updating profile")
        }
    }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <form noValidate
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
    >
      {showMessage ? (
        <h3 className="text-green-500 text-xl font-semibold mb-4">
          Profile Updated
        </h3>
      ) : (
        <h2 className="text-blue-500 text-2xl font-bold mb-6">Edit Profile</h2>
      )}
  
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          Name:
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {!nameValid && (
            <span className="text-red-500 text-sm">Name cannot be empty</span>
          )}
      </div>
  
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          Email:
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {!emailValid && (
            <span className="text-red-500 text-sm">Invalid email address</span>
          )}
      </div>
  
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          Profile Image:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none"
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Profile Preview"
            className="mt-4 w-24 h-24 rounded-full object-cover"
          />
        )}
      </div>
  
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>
  
  )
}

export default EditCom
