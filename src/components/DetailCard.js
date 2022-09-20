import React from "react";
import { Link } from "react-router-dom";
import "./detailcard.css";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";


const DetailCard = ({
  id,
  title,
  poster_path,
  release_date,
  popularity,
  className,
  isMovie,
}) => {
  const pColor =
    popularity >= 70
      ? "#21ce79"
      : popularity >= 35 && popularity < 70
      ? "#bec02d"
      : "#db2360";
  const tColor =
    popularity >= 70
      ? "#204529"
      : popularity >= 35
      ? "#423d0f"
      : popularity !== 0
      ? "#ff000054"
      : "#565a5b";

  return (
    <>
      <div className={"card home-card " + (className ? "catagory-card" : "")}>
        <div className="images">
          <div className={"wrapper"}>
            <div className="img-icon">
              <img
                src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-947-circle-more-white-4c440dfc1b0e626c70f4853dbbce9c4d1f2c5d8f3e05a7d3df47881cbd816adf.svg"
                alt="icon"
              />
            </div>
            <Link to={`/${isMovie}/details/${id}`} title={title}>
              <img src={poster_path} className="poster-img" alt="poster-img" />
            </Link>
          </div>
        </div>
        <div className="content">
          <div className="progress_bar">
            <CircularProgressbarWithChildren
              value={popularity}
              styles={buildStyles({
                pathColor: pColor,
                trailColor: tColor,
                backgroundColor: "#032b48",
              })}
            >
              <div className="progress_bar_data">
                <span>{popularity > 0 ? parseInt(popularity) : "NR"}</span>
                <sup className="sup_class">{popularity > 0 ? "%" : ""}</sup>
              </div>
            </CircularProgressbarWithChildren>
          </div>
          <div className="movie-title">
            <Link to={`/${isMovie}/detail/${id}`} title={title}>
              <h2>{title}</h2>
            </Link>
            <p>
              {new Date(release_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailCard;
