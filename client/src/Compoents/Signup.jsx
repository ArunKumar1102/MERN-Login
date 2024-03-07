/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';

export default function Signup() {
  const [value,setValue]= useState({
    name:'',
    email:'',
    password:'',
  });
  
  const handlechange=(e)=>{
    setValue({
      ...value,
      [e.target.name] : e.target.value,
    });
  
  }
  const handlesubmit=async(e)=>{
    e.preventDefault();
    const register = await axios.post("http://localhost:5000/register",value) 
    console.log(register.data);
    setValue({
      name:'',
      email:'',
      password:'',
    });
    alert('Account created');
  }
  return (
    <> 
    <div className=' container'>
        <h2>Sign Up</h2>
        <form onSubmit={handlesubmit}>
            <input type="text" placeholder='name' onChange={handlechange} value={value.name} name="name" id="" />
            <input type="text" placeholder='email' onChange={handlechange} value={value.email} name="email" id="" />
            <input type="text" placeholder='password' onChange={handlechange} value={value.password} name="password" id="" />
            <button type='submit'>Sign Up</button>
        </form>
    </div>
    </>
  )
}
