import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
// import OverlayTrigger from "react-bootstrap/OverlayTrigger";
// import Popover from "react-bootstrap/Popover";
import "./detailcard.css";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import bookmark from "../assets/bookmark-tooltip.svg";
import heart from "../assets/heartRecommendation.svg";
import addtolist from "../assets/add-to-list.svg";
import star from "../assets/star-tooltip.svg";

const DetailCard = ({
  id,
  title,
  poster_path,
  release_date,
  popularity,
  className,
  isMovie,
}) => {
  const ref = useRef();
  const [modal, setModal] = useState(false);
  // const [show, setShow] = React.useState();

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (ref && ref.current && ref.current.contains(e.target)) {
        setModal((pre) => !pre);
      } else {
        setModal(false);
      }
    });
  }, []);

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
                ref={ref}
              />
            </div>

            <Link to={`/${isMovie}/detail/${id}`} title={title}>
              <img
                src={poster_path}
                className="poster-img one"
                alt="poster-img"
              />
            </Link>
            {modal && (
              <div className={"main-tooltip_container show_tooltip"}>
                <ul className="tooltip-data">
                  <li className="main-tooltip-container border-bottom">
                    <img
                      className="tooltip-icon"
                      src={addtolist}
                      alt="tooltip-icon"
                    />
                    <p>Add to list</p>
                  </li>
                  <li className="main-tooltip-container border-bottom">
                    <img
                      className="tooltip-icon"
                      src={heart}
                      alt="tooltip-icon"
                    />
                    <p>Favourite</p>
                  </li>
                  <li className="main-tooltip-container border-bottom">
                    <img
                      className="tooltip-icon"
                      src={bookmark}
                      alt="tooltip-icon"
                    />
                    <p>Watchlist</p>
                  </li>
                  <li className="main-tooltip-container">
                    <img
                      className="tooltip-icon"
                      src={star}
                      alt="tooltip-icon"
                    />
                    <p>Your rating</p>
                  </li>
                </ul>
              </div>
            )}
          </div>
          {modal && <div className="blur-background"></div>}
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
