import React from 'react'

const LoginPage = () => {
  return (
    <div className='form-container sign-in'>
    <form>
        <h1>Sign In</h1>
        <input type='email' placeholder='Email'/>
        <input type='password' placeholder='password'/>
        <a href='#'>Forget Your Password?</a>
        <button>Sign In</button>
    </form>
</div>
  )
}

export default LoginPage
