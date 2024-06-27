import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import '../styles/App.css';
import { doSignInWithEmailandPassword } from '../auth';
import { useAuth } from '../contexts/authContext';
import logo from '../images/fitlib.png';

const Login = () => {
  const { userLoggedIn } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  
  const onSubmit = async (e) => {
    e.preventDefault()
    if(!isSigningIn){
      setIsSigningIn(true)
      await doSignInWithEmailandPassword(email, password)
      console.log(email)
    }
  }

  return (
    <div>
      {userLoggedIn && (<Navigate to={'/dashboard'} replace={true} />)}
      <div className="logincontainer">
        <div className="maintitle">
          {/* <div className="logintitle"><strong>FIT LIBRARY</strong></div> */}
          <div className="logintitle"><img src={logo}></img></div>
          <div className="loginsubtitle">Official Library of the FEU Institute of Technology</div>
        </div>
        <form action="#" className='loginform' onSubmit={onSubmit}>
          <div className="loginname">
                <i className="fas fa-user"></i>
                <input type="email" 
                      placeholder="Student Email" 
                      required 
                      value={email} onChange={(e) => { setEmail(e.target.value)}}/>
              </div>
              <div className="password">
                <i className="fas fa-lock"></i>
                <input type="password" 
                      placeholder="Password" 
                      required 
                      value={password} onChange={(e) => { setPassword(e.target.value)}}/>
              </div>
              {errorMessage && (
                <span className='text-red-600 font-bold'>{errorMessage}</span>
              )} 
            <div className="loginBtn">
                <button type="submit" 
                        disabled={isSigningIn}>
                        {isSigningIn ? 'Logging In...' : 'Log In'}
                </button>
            </div>
        </form>
    </div>
    </div>

  );
};

export default Login;
