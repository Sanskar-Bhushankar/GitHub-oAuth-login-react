import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [user,setUser] = useState(null);

  useEffect(()=>{
    const  params = new URLSearchParams(window.location.search);
    const userData = params.get("user");
    if(userData){
      setUser(JSON.parse(userData));
    }
  },[])

  const handlesubmit =()=>{
    window.location.href = "http://localhost:9000/auth/github";
  }

  return (
    <>
      {user ? (
        <>
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4 text-center">
            👋 Hi there
          </h1>
          <h2 className="text-xl text-gray-600 mb-6 text-center">
            Welcome <span className="font-semibold text-indigo-600">{user?.login}</span>
          </h2>
          <div className="flex justify-center">
            <img
              src={user?.avatar_url}
              alt="GitHub Avatar"
              className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-lg"
            />
          </div>
        </>
      ) : (
        <div className="flex justify-center">
          <button
            onClick={handlesubmit}
            className="px-6 py-3 mt-10 bg-indigo-600 hover:bg-indigo-700 text-white text-lg rounded-lg shadow transition duration-300 ease-in-out"
          >
            Login with GitHub
          </button>
        </div>
      )}
    </>
  );
  
}

export default App
