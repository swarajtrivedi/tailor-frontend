import React, { useState } from 'react'
import { Scissors } from "lucide-react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function SignupPage() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState();
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: ''
  })
  const verifyOtp = async () => {
    if (!otp) {
      return toast.error("Please enter the OTP.");
    }

    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:4000/verifyotp', {
        email: credentials.email,
        otp
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("OTP verified successfully!");
        setOtpVerified(true);
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      toast.error("Failed to verify OTP. Try again.");
    }
    setLoading(false);
  };

  const sendOtp = async() =>{
    if (!credentials.email) {
        return toast.error("Please enter an email first.");
      }
  
      setLoading(true);
      try {
        const { data } = await axios.post('http://localhost:4000/sendotp', {
          email: credentials.email
        });
  
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success("OTP sent successfully!");
          setOtpSent(true);
        }
      } catch (err) {
        console.error("Error sending OTP:", err);
        toast.error("Failed to send OTP. Try again.");
      }
      setLoading(false);

  }
  // sign up function, called by form onsubmit
  const signupUser = async(e) =>{
    e.preventDefault();

    const {
        username,
        email,
        password
    } = credentials;

    if (!otpVerified) {
        return toast.error("Please verify OTP before signing up.");
    }

    try{
        const {data} =  await axios.post('http://localhost:4000/signup',{
            username,
            email,
            password 
        });

        if(data.error){
            toast.error(data.error);
        }
        else {
            toast.success( `Hey ${username}, congratulations on signing up!. You can now login to your account.`);
            navigate('/login');
        }        
    }
    catch(err){
        console.log("error while signup", err);
    }
    
  }

  


  return (
    <div className="min-h-screen flex items-center justify-center bg-violet-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="flex items-center justify-center mb-6">
          <Scissors className="h-10 w-10 text-violet-600" />
          <h1 className="text-3xl font-bold text-violet-600 ml-2">Tailor</h1>
        </div>
        <form className="space-y-4" onSubmit={signupUser}>
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Choose a username"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
            <button
              type="button"
              className="mt-2 w-full py-2 px-4 border border-violet-600 rounded-md shadow-sm text-sm font-medium text-violet-600 bg-white hover:bg-violet-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              onClick={sendOtp}
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>

          {otpSent && (
            <div className="space-y-2">
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Enter OTP</label>
              <input
                id="otp"
                type="text"
                placeholder="Enter the OTP sent to your email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                type="button"
                className="w-full py-2 px-4 border border-violet-600 rounded-md shadow-sm text-sm font-medium text-violet-600 bg-white hover:bg-violet-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                onClick={verifyOtp}
                disabled={loading}
              >
                {loading ? "Verifying OTP..." : "Verify OTP"}
              </button>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500"
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            disabled={!otpVerified}
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full py-2 px-4 border border-violet-600 rounded-md shadow-sm text-sm font-medium text-violet-600 bg-white hover:bg-violet-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          >
            Back to Login
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}