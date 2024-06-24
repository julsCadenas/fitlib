import React from 'react';
import '../styles/App.css';
import { useNavigate } from 'react-router-dom';
import logo from '../images/fitlib.png';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    navigate('./dashboard');
  };

  return (
    <div className="logincontainer">
        <div className="maintitle">
          {/* <div className="logintitle"><strong>FIT LIBRARY</strong></div> */}
          <div className="logintitle"><img src={logo}></img></div>
          <div className="loginsubtitle">Official Library of the FEU Institute of Technology</div>
        </div>
        <form action="#" className='loginform' onSubmit={handleLogin}>
          <div className="loginname">
            <i className="fas fa-user"></i>
            {/* <input type="text" placeholder="Student Number" required /> */}
            <input type="text" placeholder="Student Number" />
          </div>
          <div className="password">
            <i className="fas fa-lock"></i>
            {/* <input type="password" placeholder="Password" required /> */}
            <input type="password" placeholder="Password" />
          </div>
          <div className="loginBtn">
            <button type='submit'>LOGIN</button>
          </div>
        </form>
    </div>
  );
};

export default Login;
