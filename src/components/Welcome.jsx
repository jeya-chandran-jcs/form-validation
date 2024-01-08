import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Welcome() {
    const navigate=useNavigate()
  return (
    <div className='container d-flex justify-content-center align-items-center vh-100 text-center'>
        <div>
            <h1>Hi welcome to Form validation</h1>
            <h3>click below to enter</h3>
            <button className='btn btn-primary' onClick={()=>navigate("/user")}>Enter</button>
        </div>
    </div>
  )
}
