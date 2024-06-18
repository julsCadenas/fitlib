import React from 'react';
import '../styles/App.css';

const Login = () => {
  return (
    <div className="logincontainer">
        <div className="maintitle">
          <div className="logintitle"><strong>FIT LIBRARY</strong></div>
          <div className="loginsubtitle">Official Library of the FEU Institute of Technology</div>
        </div>
        <form action="#" className='loginform'>
          <div className="loginname">
            <i className="fas fa-user"></i>
            <input type="text" placeholder="Student Number" required />
          </div>
          <div className="password">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Password" required />
          </div>
          <div className="loginBtn">
            <button>LOGIN</button>
          </div>
        </form>
    </div>
  );
};

export default Login;
