import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GetDetails } from "../../api";
import "./seasonheading.css";

const SeasionHeading = ({ id }) => {
  console.log(id);
  const [seasonDetail, setSeasonDetail] = useState([]);

  useEffect(() => {
    GetDetails("tv", id).then((response) => setSeasonDetail(response.data));
  }, [id]);
  return (
    <>
      <div className="season-detail__container">
        <div className="main-season-detail">
          <span>
            <Link to={`/tv/detail/${id}`}>
              <img
                src={`https://www.themoviedb.org/t/p/w58_and_h87_face${seasonDetail.poster_path}`}
                alt="one"
              />
            </Link>
          </span>
        </div>
        <div className="season-detail__section">
          <h3 className="season-title">
            {seasonDetail.name}
            &nbsp;
            <span className="season-date">
              {seasonDetail.first_air_date &&
                seasonDetail.first_air_date.slice(0, 4)}
            </span>
          </h3>
          <h6>
            <Link className="back-to-page" to={`/tv/detail/${id}`}>
              &#8656; Back to page
            </Link>
          </h6>
        </div>
      </div>
    </>
  );
};

export default SeasionHeading;
