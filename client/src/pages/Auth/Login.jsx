/*

Copyright 2024 Himanshu Dinkar

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/


import axios from 'axios';
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';




function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { token, setToken } = useAuth();
  const [errors,setErrors]=useState('');
  const [loading,setLoading]=useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);

    try{
    const response = await axios.post(`${backendUrl}/api/v1/login`,{
      email,
      password
    });
    
    if(response.data.success){
      const userToken  = response.data.token;
      setToken(userToken);
      localStorage.setItem('token',userToken);
      toast.success("Login Successfully");
      navigate('/')

    }
    }
    catch(error){
     if(error.response?.data?.message){
      setErrors(error.response.data.message);
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
     }
     else{
      setErrors("Some unexpected error has occured");
      toast.error("Some unexpected error has occured");
     }
    
    }
    finally{
      setLoading(false);
    }
  
  }
useEffect(()=>{
  if(token){
    navigate('/');
  }
},[token,navigate]);
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-4">
        
         {errors && <p className="border border-red-700 flex items-center justify-center p-3 h-[8%] w-full text-red-700 rounded-md mb-4 bg-yellow-50 font-semibold text-wrap max-md:w-full max-md:font-medium" > {errors} </p> }
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h1 className="text-3xl font-semibold text-center mb-8">
            Student Portal Login
          </h1>

         
          <form onSubmit={handleSubmit} className="space-y-4">
          
            <div className="relative">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-400"
                placeholder="College ID or Email"
              />
            </div>

           
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-400"
                placeholder="Password"
              />
            </div>

           
            <button
            disabled={loading}
              type="submit"
              className="w-full bg-blue-500  text-white py-2 rounded font-medium hover:bg-blue-600"
            >
              {loading ? "Logging to your account...": "login"}
            </button>


            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">OR</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

  
            <div className="text-center">
              <a href="#" className="text-sm text-blue-900">
                Forgot password?
              </a>
            </div>
          </form>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-center">
            Don not have an account?{' '}
            <Link to="/signup" className="text-blue-500 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

