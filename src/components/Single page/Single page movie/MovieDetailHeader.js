import React, { useState, useEffect } from "react";
import MovieDetailHeaderNavBar from "./MovieDetailHeaderNavBar";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { GetDetails } from "../../../api";
import { GetWatchProvider } from "../../../api";
// import { GetVideo } from "../../../api";
import "./moviedetailheader.css";
import thumbnailImage from "../../../assets/thumbnail.svg";
import list from "../../../assets/list.svg";
import bookMark from "../../../assets/bookmark.svg";
import heart from "../../../assets/heart.svg";
import star from "../../../assets/star.svg";
import expand from "../../../assets/expand.svg";
import justwatchYello from "../../../assets/justwatch-yellow.svg";
import closeBtn from "../../../assets/close.svg";

const MovieDetailHeader = ({ id, isMovie }) => {
  const [currentMovieData, setCurrentMovieData] = useState({});
  const [watchProvider, setWatchProvider] = useState({});
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [video, setVideo] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await GetWatchProvider(isMovie, id).then((response) => {
        console.log("Movie detail header", response.data);
      });
    };
    getData();
  }, [id, isMovie]);

  useEffect(() => {
    GetWatchProvider(isMovie, id)
      .then((response) => {
        return response.data.results["IN"];
      })
      .then((data) => {
        if (data && data.flatrate) {
          setWatchProvider({
            providerName: data.flatrate[0].provider_name,
            providerLogo: `https://www.themoviedb.org/t/p/original${data.flatrate[0].logo_path}`,
            watchText: "Now Streaming",
          });
        } else if (data && data.buy) {
          setWatchProvider({
            providerName: data.buy[0].provider_name,
            providerLogo: `https://www.themoviedb.org/t/p/original${data.buy[0].logo_path}`,
            watchText: "Available to Rent or Buy",
          });
        } else {
          setWatchProvider({});
        }
      });
  }, [id, isMovie]);

  useEffect(() => {
    setCurrentMovieData({});
    const getData = async () => {
      await GetDetails("movie", id).then((response) =>
        setCurrentMovieData(response.data)
      );
      setIsLoading(true);
    };
    getData();
  }, [id]);

  // useEffect(() => {
  //   const getVideoData = async () => {
  //     await GetVideo(isMovie, id).then((response) => {
  //       const trailer = response.data.results.find(
  //         (video) => video.name === "Official Trailer"
  //       );
  //       setVideo(trailer);
  //       console.log(trailer);
  //     });
  //   };
  //   getVideoData();
  // }, [isMovie, id]);
  const classHandler = () => {
    setIsActive((current) => !current);
  };

  const pColor =
    currentMovieData.popularity >= 70
      ? "#21ce79"
      : currentMovieData.popularity >= 35 && currentMovieData.popularity < 70
      ? "#bec02d"
      : "#db2360";

  const tColor =
    currentMovieData.popularity >= 70
      ? "#204529"
      : currentMovieData.popularity >= 35
      ? "#423d0f"
      : currentMovieData.popularity !== 0
      ? "#ff000054"
      : "#565a5b";

  return !isLoading ? (
    ""
  ) : (
    <>
      <MovieDetailHeaderNavBar />
      <div
        className={`${
          isActive ? "movie-header-section-dark-gb" : "movie-header-section"
        }`}
      >
        <div className="container-fluid position-relative p-0">
          <img
            src={
              currentMovieData.backdrop_path
                ? `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${currentMovieData.backdrop_path}`
                : ""
            }
            alt="movie-detail__header"
            className="movie-detail__header"
          />

          <div
            className={`container poster-section__moviedetail ${
              isActive ? "hide" : ""
            }`}
          >
            <div className="left-section ">
              <div className="poster_wrapper ">
                <div className="poster-moive  ">
                  <div className="detail-image-container position-relative">
                    <img
                      className="image-hover "
                      src={
                        currentMovieData.poster_path
                          ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${currentMovieData.poster_path}`
                          : thumbnailImage
                      }
                      alt={currentMovieData.title}
                    />
                    <div className="image-hover-background">
                      <span>
                        <img
                          src={expand}
                          alt="expand"
                          className="image-hover-expand"
                        />
                        Expand
                      </span>
                    </div>
                  </div>
                  <div className="watchprovider-wrapper">
                    {Object.keys(watchProvider).length !== 0 && (
                      <button className="text_wrapper" onClick={classHandler}>
                        <div className="movie-provider">
                          <img
                            className="bg-grey"
                            src={watchProvider.providerLogo}
                            width="36"
                            height="36"
                            alt={`Now streaming on ${watchProvider.providerName}`}
                          />
                        </div>
                        <div className="text">
                          <span>
                            <h6 className="now-streaming">
                              {watchProvider.watchText}
                            </h6>
                            <h6 className="watch-now">
                              <span
                                className="no_click"
                                to="/"
                                title={`Now streaming on ${watchProvider.providerName}`}
                              >
                                Watch Now
                              </span>
                            </h6>
                          </span>
                        </div>
                      </button>
                    )}
                  </div>
                  {/* <WatchProvider id={id} isMovie="movie" /> */}
                </div>
              </div>
            </div>
            <div className="movie-header-right-section  d-flex align-items-center">
              <div className="movie-title-section">
                <h2 className="d-flex">
                  {currentMovieData.title}
                  <span className="release_year d-flex">
                    (
                    {currentMovieData.release_date &&
                      currentMovieData.release_date.slice(0, 4)}
                    )
                  </span>
                </h2>

                <div className="facts">
                  <span className="certification">R</span>

                  <span className="release">
                    {currentMovieData.release_date &&
                      new Date(
                        currentMovieData.release_date
                      ).toLocaleDateString("en-IN")}
                    (IN)
                  </span>

                  <span className="genres">
                    {currentMovieData.genres &&
                      currentMovieData.genres
                        .map((genreObj) => genreObj.name)
                        .join(",")}
                  </span>

                  <span className="runtime">
                    {currentMovieData.runtime >= 60
                      ? Math.floor(currentMovieData.runtime / 60) + "h "
                      : ""}

                    {currentMovieData.runtime % 60 < 60
                      ? (currentMovieData.runtime % 60) + "m"
                      : ""}
                  </span>
                </div>

                <ul className="actions">
                  <li className="chart">
                    <div className="circular_progress_bar_large">
                      <CircularProgressbarWithChildren
                        value={currentMovieData.vote_average * 10}
                        styles={buildStyles({
                          pathColor: pColor,
                          trailColor: tColor,
                          backgroundColor: "#032b48",
                        })}
                      >
                        <div className="circular_progress_bar_data d-flex">
                          <span>
                            {currentMovieData.vote_average
                              ? parseInt(currentMovieData.vote_average * 10)
                              : 0}
                          </span>
                          <sup>%</sup>
                        </div>
                      </CircularProgressbarWithChildren>
                    </div>
                    <div className="text">
                      User
                      <br />
                      Score
                    </div>
                  </li>

                  <li className="icon-list icon-list-left-margin">
                    <img className="icon-list-img" src={list} alt="img" />
                  </li>

                  <li className="icon-list">
                    <img className="icon-list-img" src={heart} alt="img" />
                  </li>

                  <li className="icon-list">
                    <img className="icon-list-img" src={bookMark} alt="img" />
                  </li>

                  <li className="icon-list">
                    <img className="icon-list-img" src={star} alt="img" />
                  </li>
                </ul>

                <div className="header_info">
                  <h3 className="tagline">{currentMovieData.tagline}</h3>

                  <h3 className="overview-heading">Overview</h3>
                  <div className="overview">
                    <p>{currentMovieData.overview}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2nd section */}
          </div>

          {/* 3rd data section */}
          <div
            className={`just-watch-data-hidden ${isActive ? "show-data" : ""}`}
          >
            <div className="just-watch-poster">
              <img
                src={
                  currentMovieData.poster_path
                    ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${currentMovieData.poster_path}`
                    : thumbnailImage
                }
                alt={currentMovieData.title}
              />
            </div>
            <div className="just-watch-detail_container">
              <div className="just-watch__btn">
                <img
                  className="just-watch__btn-img"
                  src={justwatchYello}
                  alt="just-watch-yellow"
                />
                <div onClick={classHandler}>
                  <img src={closeBtn} alt="close" />
                </div>
              </div>
              <div className="justwatch-text">
                <p>
                  This movie is currently available to stream in India.JustWatch
                  makes it easy to find out where you can legally watch your
                  favourite movies &amp; TV shows online. Visit JustWatch for
                  more information.
                </p>
              </div>
              <div className="quality-container">
                <ul className="quality-list">
                  <li className="quality-list-item">Best Price</li>
                  <li className="quality-list-item-last">SD</li>
                  <li className="quality-list-item-last">HD</li>
                  <li className="quality-list-item-last">4K</li>
                </ul>
              </div>
              <div className="just-watch-image">
                <h3>Stream</h3>
                <img src={watchProvider.providerLogo} alt="just-watch-img" />
              </div>
            </div>
          </div>
          {/* 3rd data section */}
        </div>
      </div>
    </>
  );
};

export default MovieDetailHeader;
