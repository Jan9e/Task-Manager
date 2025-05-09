import axios from 'axios';
import React, { useState } from 'react'
import '../styles/loginSignup.css'
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [error, setError]= useState('');
  const [message, setMessage]= useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();

    setError('');
    setMessage('');

    if(!email || !password){
      setError('All fields required');
      return;
    }

    try{
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.name);
      setMessage('Login Successful');
      navigate('/dashboard');
    }catch(err){
      if(err.response){
        setError(err.response.data.message);
      }else{
        setError('An error occured. Please try again later.');
      }
    }
  }

  return (
    <div className='form-container sign-in'>
    <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>

        {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
        {message && <p style={{ color: 'green', marginBottom: '10px' }}>{message}</p>}

        <input type='email' placeholder='Email'value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type='password' placeholder='password'value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <a href='#'>Forget Your Password?</a>
        <button type='submit'>Sign In</button>
    </form>
</div>
  )
}

export default LoginPage
