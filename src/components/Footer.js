import React from "react";
import footerlogo from "../assets/footer-logo.svg";
import "./footer.css";
const Footer = () => {
  return (
    <>
      <div className="footer__background">
        <div className="footer__content">
          <div className="footer__logo">
            <img src={footerlogo} alt="footer-logo" />
          </div>
          <div className="footer__text">
            <div className="basic-text">
              <h3>THE BASICS</h3>
              <p>About TMDB</p>
              <p>Contact Us</p>
              <p>Support Forums </p>
              <p>API</p>
              <p>System Status</p>
            </div>
            <div className="basic-text">
              <h3>GET INVOLVED</h3>
              <p>Contribution Bible</p>
              <p>Add New Movie</p>
              <p>Add New Tv Show </p>
            </div>
            <div className="basic-text">
              <h3>COMMUNITY</h3>
              <p>Guidelines</p>
              <p>Discussions</p>
              <p>Leaderboard </p>
              <p>Twitter</p>
            </div>
            <div className="basic-text">
              <h3>LEGAl</h3>
              <p>Terms of Use</p>
              <p>API Terms of Use</p>
              <p>Privacy Policy</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
