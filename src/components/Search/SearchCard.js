import React from "react";
import { Link } from "react-router-dom";
import thumbnail from "../../assets/thumbnail.svg";
import "./searchcard.css";

const SearchCard = ({ poster_path, title, realse_date, overview, id, isMovie }) => {
  return (
    <div className="card search-content-container">
      <div className="search-img-container">
        <Link to={`/${isMovie}/detail/${id}`}>
          <img
            src={
              poster_path
                ? `https://www.themoviedb.org/t/p/w94_and_h141_bestv2${poster_path}`
                : thumbnail
            }
            alt={title}
          />
        </Link>
      </div>
      <div className="search-detail">
        <div className="main-search-detail">
          <Link to={`/${isMovie}/detail/${id}`}>
            <h2>{title}</h2>
            <div />
          </Link>
          <span className="release-date">{realse_date}</span>
        </div>
        <div className="overview-data">
          <p>{overview}</p>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
