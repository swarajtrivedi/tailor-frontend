import React from 'react'
import { Scissors } from "lucide-react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function LoginPage() {

  const loginUser = (e) =>{
    e.preventDefault()
    console.log('Something')
    axios.get('http://localhost:4000/login').then((res)=> console.log("resp",res))
  }
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-violet-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="flex items-center justify-center mb-6">
          <Scissors className="h-10 w-10 text-violet-600" />
          <h1 className="text-3xl font-bold text-violet-600 ml-2">Tailor</h1>
        </div>
        <form className="space-y-4" onSubmit={loginUser}>
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Email-Id</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
            />
          </div>
          <button 
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            type="button"
            className="w-full py-2 px-4 border border-violet-600 rounded-md shadow-sm text-sm font-medium text-violet-600 bg-white hover:bg-violet-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          >
            Sign Up
          </button>
          <div className="text-center">
            <a href="#" className="text-sm text-violet-600 hover:underline">Forgot password?</a>
          </div>
        </form>
      </div>
    </div>
  )
}