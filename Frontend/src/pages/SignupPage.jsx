import React, { useEffect, useRef } from 'react';
import LoginPage from './LoginPage';

const SignupPage = () => {
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

  return (
    <div className='container' ref={containerRef}>
      {/* Sign Up Form */}
      <div className='form-container sign-up'>
        <form>
          <h1>Create Account</h1>
          <input type='text' placeholder='Name' />
          <input type='email' placeholder='Email' />
          <input type='password' placeholder='Password' />
          <button>Sign Up</button>
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
