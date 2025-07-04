import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const [email, setEmail] = useState()
      const [password, setPassword] = useState()
      const navigate=useNavigate
      const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:3001/login',{email,password})
        .then(result=>console.log(result))
        .catch(err=>console.log(err))
        navigate('/home')
      }
  return (
    <div className="flex justify-center items-center bg-gray-700 min-h-screen">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              autoComplete="off"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
           onChange={(e)=>setName(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              autoComplete="off"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
           onChange={(e)=>setEmail(e.target.value)}  />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              autoComplete="off"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
           onChange={(e)=>setPassword(e.target.value)}  />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold transition duration-200"
          >
            Register
          </button>
            </form>
          <p className="text-center text-sm mt-4">Already have an account?</p>
          <Link to="/login"
            type="button"
            className="w-full mt-2 border border-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-md font-semibold transition duration-200"
          >
            LOGIN
          </Link>
      
      </div>
    </div>
  );
};

export default Login;
