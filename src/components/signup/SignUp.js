import React from "react";
import "./signup.css";
import rightArrow from "../../assets/right-arrow.svg";

const SignUp = () => {
  return (
    <>
      <div className="container signup-main-container">
        <div className="signup__container">
          <div className="main-signup__container">
            <div className="sign-up__data">
              <div className="signup__heading">
                <h3>Benefits of being a member</h3>
              </div>
              <ul className="main-data__container">
                <li className="rightmark__data">
                  <img
                    src={rightArrow}
                    alt="right-arrow"
                    className="right__mark"
                  />
                  <p>
                    Find something to watch on your subscribed streaming
                    services
                  </p>
                </li>
                <li className="rightmark__data">
                  <img
                    src={rightArrow}
                    alt="right-arrow"
                    className="right__mark"
                  />
                  <p> Log the movies and TV shows you have watched</p>
                </li>
                <li className="rightmark__data">
                  <img
                    src={rightArrow}
                    alt="right-arrow"
                    className="right__mark"
                  />
                  <p>
                    Keep track of your favourite movies and TV shows and get
                    recommendations from them
                  </p>
                </li>
                <li className="rightmark__data">
                  <img
                    src={rightArrow}
                    alt="right-arrow"
                    className="right__mark"
                  />
                  <p> Build and maintain a personal watchlist</p>
                </li>
                <li className="rightmark__data">
                  <img
                    src={rightArrow}
                    alt="right-arrow"
                    className="right__mark"
                  />
                  <p> Build custom mixed lists (movies and TV)</p>
                </li>
                <li className="rightmark__data">
                  <img
                    src={rightArrow}
                    alt="right-arrow"
                    className="right__mark"
                  />
                  <p> Take part in movie and TV discussions</p>
                </li>
                <li className="rightmark__data">
                  <img
                    src={rightArrow}
                    alt="right-arrow"
                    className="right__mark"
                  />
                  <p>
                    Contribute to, and improve the information in our database
                  </p>
                </li>
              </ul>
            </div>
            <div className="sign-up__detail">
              <div className="sign-up-detail-data">
                <h3>Sign up for an account</h3>
                <p>
                  Signing up for an account is free and easy. Fill out the form
                  below to get started. JavaScript is required to to continue.
                </p>
              </div>

              <form className="form__container">
                <div className="main-form">
                  <label htmlFor="username" className="form_label">
                    UserName
                  </label>
                  <input
                    type="text"
                    className="login-form__input"
                    id="username"
                  />
                </div>
                <div className="main-form">
                  <label htmlFor="password" className="form_label">
                    Password (4 characters minimum)
                  </label>
                  <input
                    type="text"
                    className="login-form__input"
                    id="password"
                  />
                  <label htmlFor="username" className="form_label">
                    Password Confirm
                  </label>
                  <input
                    type="text"
                    className="login-form__input"
                    id="username"
                  />
                </div>
                <div className="main-form">
                  <label htmlFor="password" className="form_label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="login-form__input"
                    id="password"
                  />
                </div>
                <div className="sign-up__text">
                  <p>
                    By clicking the "Sign up" button below, I certify that I
                    have read and agree to the TMDB terms of use and privacy
                    policy.
                  </p>
                </div>
                <div className="btn__container">
                  <button className="login-btn">Sign Up</button>
                  <button className="reset-btn">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
