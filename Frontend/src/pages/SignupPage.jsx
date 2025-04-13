import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import LoginPage from './LoginPage';
import '../styles/loginSignup.css'

const SignupPage = () => {
  const [name, setName]= useState('');
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [error, setError]= useState('');
  const [message, setMessage]= useState('');

  const signinBtnRef = useRef(null);
  const signupBtnRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const signinBtn = signinBtnRef.current;
    const signupBtn = signupBtnRef.current;
    const container = containerRef.current;

    const handleSignInClick = () => {
      container.classList.remove('active');
    };

    const handleSignUpClick = () => {
      container.classList.add('active');
    };

    signinBtn.addEventListener('click', handleSignInClick);
    signupBtn.addEventListener('click', handleSignUpClick);

    return () => {
      signinBtn.removeEventListener('click', handleSignInClick);
      signupBtn.removeEventListener('click', handleSignUpClick);
    };
  }, []);

  //Handle the submission

  const handleSubmit = async(e)=>{
    e.preventDefault();

    setError('');
    setMessage('');

    if(!name || !email || !password){
      setError('All fields are required');
      return;
    }

    try{
      const response = await axios.post('https://task-manager-backend-6tyc.onrender.com/register', {
        name,
        email,
        password
      });
      setMessage('User registered successfully');
    }catch(err){
      if(err.response){
        setError(err.response.data.message);
      }else{
        setError('An error occured. Please try again later.');
      }
    }
  };

  return (
    <div className='container' ref={containerRef}>
      {/* Sign Up Form */}
      <div className='form-container sign-up'>
        <form onSubmit={handleSubmit}>
          <h1>Create Account</h1>

          {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
          {message && <p style={{ color: 'green', marginBottom: '10px' }}>{message}</p>}

          <input type='text' placeholder='Name' value={name} onChange={(e)=> setName(e.target.value)}/>
          <input type='text' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <button type='submit'>Sign Up</button>
        </form>
      </div>

        <LoginPage />
    

      {/* Toggle Panel */}
      <div className='toggle-container'>
        <div className='toggle'>
          <div className='toggle-panel toggle-left'>
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features.</p>
            <button className='hidden' ref={signinBtnRef}>Sign In</button>
          </div>
          <div className='toggle-panel toggle-right'>
            <h1>Hello Friend!</h1>
            <p>Register with your personal details to use all of site features.</p>
            <button className='hidden' ref={signupBtnRef}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
