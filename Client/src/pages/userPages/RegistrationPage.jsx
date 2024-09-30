import { Form, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../../../../constants/axios.js";

function Registration() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [image, setImage] = useState(null);
  const [conPass, setConPass] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [nameValid, setNameValid] = useState(true);

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 5 && password.length <= 10;
  };

  const confirmPass = (password, password2) => {
    return password === password2;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isNameValid = name.trim() !== "";
    const isConPass = confirmPass(password, password2);

    setEmailValid(isEmailValid);
    setPasswordValid(isPasswordValid);
    setNameValid(isNameValid);
    setConPass(isConPass);

    if (!isEmailValid || !isPasswordValid || !isNameValid || !isConPass) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post("/", formData);
      if (response.status === 201) {
        navigate("/login");
      } else {
        alert("The user already exists");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form
        className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Registration</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your name"
          />
          {!nameValid && (
            <span className="text-red-500 text-sm">Name cannot be empty</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="sample@gmail.com"
          />
          {!emailValid && (
            <span className="text-red-500 text-sm">Invalid email address</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="5-10 characters"
          />
          {!passwordValid && (
            <span className="text-red-500 text-sm">
              Password must be 5-10 characters long
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Confirm Password</label>
          <input
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
          {!conPass && (
            <span className="text-red-500 text-sm">Passwords do not match</span>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Upload Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            accept="image/*"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Register
        </button>

        <Link
          to="/login"
          className="block mt-4 text-center text-blue-500 hover:underline"
        >
          Already have an account? Login
        </Link>
      </form>
    </div>
  );
}

export default Registration;
