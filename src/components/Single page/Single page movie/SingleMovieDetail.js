import React from "react";
import { useParams } from "react-router-dom";
import Cast from "./Cast";
import MovieDetailHeader from "./MovieDetailHeader";
import Reviews from "./Reviews";
import "./singlemoviedetail.css";
import MainMedia from "../Single page movie/Media/MainMedia";
import Recommendations from "../Single page movie/Media/Recommendations";
import MovieDetailRightSection from "./MovieDetailRightSection";

const SingleMovieDetail = () => {
  const params = useParams();

  return (
    <>
      <MovieDetailHeader id={params.id} isMovie="movie" />
      <div className="movie-middle-wrapper container">
        <div className="movie-middle-section">
          <Cast id={params.id} isMovie="movie" />
          <Reviews id={params.id} isMovie="movie" />
          <MainMedia id={params.id} isMovie="movie" />
          <Recommendations id={params.id} />
        </div>
        <div className="movie-right-wrapper">
          <MovieDetailRightSection id={params.id} isMovie="movie" />
        </div>
      </div>
    </>
  );
};

export default SingleMovieDetail;
