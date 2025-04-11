import React, { useEffect, useRef } from 'react'

const TogglePage = () => {
    const signinBtnRef= useRef(null);
    const signupBtnRef= useRef(null);
    const containerRef = useRef(null);

        useEffect(()=>{
            const signinBtn= signinBtnRef.current;
            const signupBtn= signupBtnRef.current;
            const container = containerRef.current;

            const handleSignInClick=()=>{
                container.classList.remove('active');
            };

            const handleSignUpClick=()=>{
                container.classList.add('active');
            };

            signinBtn.addEventListener('click', handleSignInClick);
            signupBtn.addEventListener('click', handleSignUpClick);

            return ()=>{
                signinBtn.removeEventListener('click', handleSignInClick);
                signupBtn.removeEventListener('click', handleSignUpClick);
            };
        }, []);
   

  return (
    <div className='toggle-container' ref={containerRef}>
      <div className='toggle'>
        <div className='toggle-panel toggle-left'>
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of site features.</p>
            <button className='hidden' id='login' ref={signinBtnRef}>Sign In</button>
        </div>
        <div className='toggle-panel toggle-right'>
            <h1>Hello Friend!</h1>
            <p>Register with your personal details to use all of site features.</p>
            <button className='hidden' id='register' ref={signupBtnRef}>Sign Up</button>
        </div>
      </div>
    </div>
  )
}

export default TogglePage
