import React from "react";
import { Link } from "react-router-dom";
import "./login.css";
const Login = () => {
  return (
    <>
      <div className="container">
        <div className="login__wrapper">
          <h2 className="login__heading">Login to your account</h2>
          <p>
            In order to use the editing and rating capabilities of TMDB, as well
            as get personal recommendations you will need to login to your
            account. If you do not have an account, registering for an account
            is free and simple. <Link to="/signup">Click here</Link> to get
            started.
          </p>
          <p>
            If you signed up but didn't get your verification email,{" "}
            <Link to="/login">click here</Link> to have it resent.
          </p>
          <form className="form__container">
            <div className="main-form">
              <label htmlFor="username" className="form_label">
                UserName
              </label>
              <input type="text" className="login-form__input" id="username" />
            </div>
            <div className="main-form">
              <label htmlFor="password" className="form_label">
                PassWord
              </label>
              <input type="text" className="login-form__input" id="password" />
            </div>
            <div className="btn__container">
              <button className="login-btn">Login</button>
              <button className="reset-btn">Reset Password</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
