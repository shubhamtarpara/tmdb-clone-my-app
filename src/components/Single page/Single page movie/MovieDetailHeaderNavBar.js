import React from "react";
import "../Single page movie/moviedetailheadernavbar.css";
import dropDownArrow from "../../../assets/dropdownarrow.png";
const MovieDetailHeaderNavBar = () => {
  return (
    <>
      <nav className="header-navbar">
        <div className="header_main-nav">
          <div className="header__sub-nav ">
            <span className="header-link">
              OverView
              <img src={dropDownArrow} alt="1" className="movie-header__img" />
            </span>
            <div className="movie-items ">
              <ul className="navbar-nav">
                <li className="nav-item hover-bg">
                  <div className="header-link ">Main</div>
                </li>
                <li className="nav-item hover-bg">
                  <div className="header-link ">Alternative Titles</div>
                </li>
                <li className="nav-item hover-bg">
                  <div className="header-link ">Cast and Crew</div>
                </li>
                <li className="nav-item hover-bg">
                  <div className="header-link ">Episode Groups</div>
                </li>
                <li className="nav-item hover-bg">
                  <div className="header-link ">Series</div>
                </li>
                <li className="nav-item hover-bg">
                  <div className="header-link ">Translations</div>
                </li>
                <li className="nav-item hover-bg">
                  <div className="header-link ">Watch Now</div>
                </li>
                <li className="empty">
                  <div className="empty"></div>
                </li>
                <li className="nav-item hover-bg">
                  <div className="header-link ">Changes</div>
                </li>
                <li className="nav-item hover-bg">
                  <div className="header-link ">Report</div>
                </li>
                <li className="nav-item hover-bg">
                  <div className="header-link ">Edit</div>
                </li>
              </ul>
            </div>
          </div>
          <div className="header__sub-nav ">
            <span className="header-link">
              Media
              <img src={dropDownArrow} alt="1" className="movie-header__img" />
            </span>
            <div className="movie-items ">
              <ul className="navbar-nav">
                <li className="nav-item hover-bg">
                  <div className="header-link ">BackDrops</div>
                </li>
                <li className="nav-item hover-bg">
                  <div className="header-link ">Logos</div>
                </li>
                <li className="nav-item hover-bg">
                  <div className="header-link ">Poster</div>
                </li>
                <li className="nav-item hover-bg">
                  <div className="header-link ">Videos</div>
                </li>
              </ul>
            </div>
          </div>
          <div className="header__sub-nav ">
            <span className="header-link">
              Fandom
              <img src={dropDownArrow} alt="1" className="movie-header__img" />
            </span>
            <div className="movie-items ">
              <ul className="navbar-nav">
                <li className="nav-item hover-bg">
                  <div className="header-link ">Discussions</div>
                </li>
                <li className="nav-item hover-bg">
                  <div className="header-link ">Reviews</div>
                </li>
              </ul>
            </div>
          </div>
          <div className="header__sub-nav ">
            <span className="header-link">
              Share
              <img src={dropDownArrow} alt="1" className="movie-header__img" />
            </span>
            <div className="movie-items ">
              <ul className="navbar-nav">
                <li className="nav-item hover-bg">
                  <div className="header-link ">Share Link</div>
                </li>
                <li className="nav-item hover-bg">
                  <div className="header-link ">FaceBook</div>
                </li>
                <li className="nav-item hover-bg">
                  <div className="header-link ">Tweet</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MovieDetailHeaderNavBar;
