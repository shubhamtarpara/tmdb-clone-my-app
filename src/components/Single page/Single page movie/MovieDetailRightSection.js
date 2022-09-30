import React, { useState, useEffect } from "react";
import { GetDetails } from "../../../api";
import { GetExternalIDs } from "../../../api";

import "./moviedetailrightsection.css";
import facebook from "../../../assets/facebook.svg";
import instagram from "../../../assets/instagram.svg";
import twitter from "../../../assets/twitter.svg";
import justwatch from "../../../assets/justwatch.svg";
import glyphicons from "../../../assets/glyphicons.svg";
import KeyWord from "./KeyWord";

const MovieDetailRightSection = ({ id, isMovie }) => {
  const [movieData, setMovieData] = useState({});
  const [externalIdData, setExternalIdData] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      await GetDetails(isMovie, id).then((response) => {
        setMovieData(response.data);
        // console.log(response.data, 'movie data')
      });
      setIsLoading(true);
    };

    const getIdData = async () => {
      await GetExternalIDs(isMovie, id).then((response) => {
        setExternalIdData(response.data);
      });
    };

    getIdData();
    getData();
  }, [id, isMovie]);

  return !isLoading ? (
    ""
  ) : (
    <>
      <div className="link_container">
        <div>
          <a
            className="social__link"
            href={`https://www.facebook.com/${externalIdData.facebook_id}`}
          >
            <img className="social__icon" src={facebook} alt="facebook" />
          </a>
        </div>

        <div>
          <a
            className="social__link"
            href={`https://twitter.com/${externalIdData.facebook_id}`}
          >
            <img className="social__icon" src={twitter} alt="twitter" />
          </a>
        </div>

        <div>
          <a
            className="social__link"
            href={`https://instagram.com/${externalIdData.facebook_id}`}
          >
            <img className="social__icon" src={instagram} alt="instagram" />
          </a>
        </div>

        <div className="just-watch">
          <a className="social__link" href={movieData.homepage}>
            <img className="social__icon" src={justwatch} alt="justwatch" />
          </a>
        </div>

        <div>
          <a className="social__link" href={movieData.homepage}>
            <img className="social__icon" src={glyphicons} alt="glyphicons" />
          </a>
        </div>
      </div>
      <div className="movie-data_container">
        <div className="movie-status">
          <p>
            <strong>
              Status
              <br />
            </strong>
            {movieData.status}
          </p>
        </div>
        <div className="movie-language">
          <p>
            <strong>
              Original Language
              <br />
            </strong>
            {movieData.spoken_languages[0] ? movieData.spoken_languages.english_name : 'No data'}
          </p>
        </div>
        <div className="movie-budget">
          <p>
            <strong>
              Budget
              <br />
            </strong>
            {movieData.budget > 0
              ? movieData.budget.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
              : "-"}
          </p>
        </div>
        <div className="movie-revenue">
          <p>
            <strong>
              Revenue
              <br />
            </strong>
            {movieData.revenue > 0
              ? movieData.revenue.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
              : "-"}
          </p>
        </div>
      </div>
      <KeyWord id={id} isMovie={"movie"} />
    </>
  );
};

export default MovieDetailRightSection;
