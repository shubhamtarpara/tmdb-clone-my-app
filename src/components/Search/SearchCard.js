import React from "react";
import thumbnail from "../../assets/thumbnail.svg";
import './searchcard.css'

const SearchCard = ({ poster_path, title, realse_date, overview }) => {
 
  return (
    <>
      <div className="card search-content-container">
        <div className="search-img-container">
          <img
            src={
              poster_path
                ? `https://www.themoviedb.org/t/p/w94_and_h141_bestv2${poster_path}`
                : thumbnail
            }
            alt={title}
          />
        </div>
        <div className="search-detail">
          <div className="main-search-detail">
            <h2>{title}</h2>
            <span className="release-date">{realse_date}</span>
          </div>
          <div className="overview-data">
            <p>{overview}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchCard;
