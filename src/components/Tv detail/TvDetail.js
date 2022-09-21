import React from "react";
import { Link, useParams } from "react-router-dom";
import MainMedia from "../Single page/Single page movie/Media/MainMedia";
import Recommendations from "../Single page/Single page movie/Media/Recommendations";
import Reviews from "../Single page/Single page movie/Reviews";
import Cast from "../Single page/Single page movie/Cast";
import TvDetailHeader from "./TvDetailHeader";
import SeasonCard from "./SeasonCard";
import "./tvdetail.css";
import MovieDetailRightSection from "../Single page/Single page movie/MovieDetailRightSection";
const TvDetail = () => {
  const params = useParams();

  return (
    <>
      <TvDetailHeader id={params.id} isMovie="tv" />
      <div className="movie-middle-wrapper container">
        <div className="movie-middle-section">
          <Cast id={params.id} isMovie="tv" />
          <div className="container current-season mt-5">
            <div className="current-season-wrapper pt-4">
              <h3>Current Season</h3>
              <SeasonCard id={params.id} />
              {
                <p className="view-season new_button">
                  <Link to={`/tv/season/${params.id}`}>View All Seasons</Link>
                </p>
              }
            </div>
          </div>
          <Reviews id={params.id} isMovie="tv" />
          <MainMedia id={params.id} isMovie="tv" />
          <Recommendations id={params.id} isMovie="tv" />
        </div>
        <div className="movie-right-wrapper">
          <MovieDetailRightSection id={params.id} isMovie="tv" />
        </div>
      </div>
    </>
  );
};

export default TvDetail;
