import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import solid from "../assets/add-on.svg";

const NavBar = () => {
  const showClassToggle = () => {
    const data = document.getElementById("navbarSupportedContent");
    data.classList.toggle("show");
  };
  return (
    <>
      <div className=" custom_navbar d-flex ">
        <div className="container custom-NavBar">
          <div className="navbar-container">
            <nav className="navbar navbar-expand-lg ">
              <Link className="navbar-brand" to="/">
                <img
                  src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                  alt="unknown error"
                  className="d-flex align-items-center"
                />
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={showClassToggle}
              >
                <span className="navbar-toggler-icon d-flex align-items-center justify-content-center">
                  <img className="navbar-icon__image" src={solid} alt="1" />
                </span>
              </button>

              <div
                className="collapse navbar-collapse custom-navbar-class darkBlue"
                id="navbarSupportedContent"
              >
                <div>
                  <ul className="navbar-nav mr-auto  ">
                    <li className="nav-item nav-tv ">
                      <span className="nav-link">Movies</span>
                      <div className="tv-items ">
                        <ul className="navbar-nav">
                          <li className="nav-item hover-bg">
                            <Link className="nav-link " to="/movie/category/popular">
                              Popular
                            </Link>
                          </li>
                          <li className="nav-item hover-bg">
                            <Link className="nav-link " to="/movie/category/now_playing">
                              Now Playing
                            </Link>
                          </li>
                          <li className="nav-item hover-bg">
                            <Link className="nav-link " to="/movie/category/upcoming">
                              Upcoming
                            </Link>
                          </li>
                          <li className="nav-item hover-bg">
                            <Link className="nav-link " to="/movie/category/top_rated">
                              Top Rated
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item nav-tv">
                      <span className="nav-link">TV Shows</span>
                      <div className="tv-items ">
                        <ul className="navbar-nav ">
                          <li className="nav-item hover-bg">
                            <Link className="nav-link  " to="/tv/category/popular">
                              Popular
                            </Link>
                          </li>
                          <li className="nav-item hover-bg">
                            <Link className="nav-link  " to="/tv/category/airing_today">
                              Airing Today
                            </Link>
                          </li>
                          <li className="nav-item hover-bg">
                            <Link className="nav-link  " to="/tv/category/on_the_air">
                              On TV
                            </Link>
                          </li>
                          <li className="nav-item hover-bg">
                            <Link className="nav-link  " to="/tv/category/top_rated">
                              Top Rated
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item nav-tv">
                      <span className="nav-link">People</span>
                      <div className="tv-items ">
                        <ul className="navbar-nav ">
                          <li className="nav-item hover-bg">
                            <div className="nav-link" to="/tv/popular">
                              Popular People
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item nav-tv">
                      <span className="nav-link">More</span>
                      <div className="tv-items">
                        <ul className="navbar-nav ">
                          <li className="nav-item hover-bg">
                            <div className="nav-link  " to="/tv/popular">
                              Discussion
                            </div>
                          </li>
                          <li className="nav-item hover-bg">
                            <div className="nav-link  " to="/tv/airing_today">
                              Leaderboard
                            </div>
                          </li>
                          <li className="nav-item hover-bg">
                            <div className="nav-link  " to="/tv/on_the_air">
                              Support
                            </div>
                          </li>
                          <li className="nav-item hover-bg">
                            <div className="nav-link  " to="/tv/top_rated">
                              API
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="navbar-nav mr-auto  ">
                    <li className="nav-item ">
                      <span className="nav-link  " to="/">
                        <i className="fa-solid fa-plus "></i>
                      </span>
                    </li>
                    <li className="nav-item  nav-lan">
                      <span className="nav-link  language" to="/">
                        EN
                      </span>
                    </li>
                    <li className="nav-item ">
                      <Link className="nav-link  " to="/login">
                        Login
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <Link className="nav-link  " to="/signup">
                        Join TMDB
                      </Link>
                    </li>
                    <li className="nav-item">
                      <span className="nav-link  nav-mag" to="/">
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
