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
import TvDetail from "./components/Tv detail/TvDetail";
import SeasonDetail from "./components/Tv detail/SeasionDetail";
import SearchResult from "./components/Search/SearchResult";
import CategoryPage from "./components/Category/MainCategory";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import FullReview from "./components/Single page/Single page movie/FullReview";

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
          <Route path="/movie/detail/:id" element={<SingleMovieDetail />} />
          <Route path="/tv/detail/:id" element={<TvDetail />} />
          <Route
            path="/:showType/category/:categoryType"
            element={<CategoryPage />}
          />
          <Route path="/:isMovie/reviews/:reviewID" element={<FullReview />} />
          <Route path="/tv/season/:id" element={<SeasonDetail />} />
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
