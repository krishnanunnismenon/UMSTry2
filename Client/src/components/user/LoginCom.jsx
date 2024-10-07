import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from '../../redux/slices/userSlice';
import axios from '../../../constants/axios';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailvalid, setEmailvalid] = useState(true);
  const [passvalid, setPassvalid] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isemail = email.trim() !== "";
    const isPassword = password.trim() !== "";

    setEmailvalid(isemail);
    setPassvalid(isPassword);

    if (!isemail || !isPassword) {
      return;
    }
    const userCredentails = { email, password };
    try {
      const response = await axios.post("/login", userCredentails);
      setMessage(response.data.message);

      if (response.status === 201) {
        const user = response.data.userDetails;
        
        const token = response.data.token;
        
        localStorage.setItem("token", token);
        dispatch(setUser(user));
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        className="w-full max-w-sm bg-white rounded-lg shadow-md p-8"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Login Page</h2>
        {message && <p className="text-red-500 text-sm text-center">{message}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!emailvalid && (
            <p className="text-red-500 text-xs italic">Email cannot be empty</p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!passvalid && (
            <p className="text-red-500 text-xs italic">Password cannot be empty</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
        <Link
          to="/"
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mt-4"
        >
          Already have an account? Register
        </Link>
      </form>
    </div>
  );
}


export default Login
