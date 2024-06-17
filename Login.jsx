import React from 'react';
import '../styles/App.css';

const Login = () => {
  return (
    <div className="container">
      <div className="wrapper">
        <div className="maintitle">
          <div className="title">FIT LIBRARY</div>
          <div className="subtitle">Official Library of the FEU Institute of Technology</div>
          <div className="lbutton">Login</div>
        </div>
        <form action="#">
          <div className="row">
            <i className="fas fa-user"></i>
           <input type="text" placeholder=" " required />
          </div>
          <div className="row">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder=" " required />
          </div>
          <div className="row button">
            <input type="submit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
