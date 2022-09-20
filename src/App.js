import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Popular from "./components/What's popular/Popular";
import FreeToWatch from "./components/Free to watch/FreeToWatch";
import SearchBackground from "./components/SearchBackground";
import MainTrending from "./components/Trending/MainTrending";
import Footer from "./components/Footer";
import SingleMovieDetail from "./components/Single page/Single page movie/SingleMovieDetail";
import SearchResult from "./components/Search/SearchResult";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
const App = () => {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBackground />
                <Popular />
                <FreeToWatch />
                <MainTrending />
              </>
            }
          />
          <Route path="/movie/details/:id" element={<SingleMovieDetail />} />
          <Route path="/search/:currentData" element={<SearchResult />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
