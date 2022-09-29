import { Link } from "react-router-dom";
import "./filtermoviecard.css";
// import { Circle } from 'rc-progress';
import "../icon.css";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";

const FilterMovieCard = ({
  id,
  poster,
  title,
  date,
  rating,
  showType,
  movie,
}) => {
  console.log(movie.vote_average);
  movie.media_type && (movie.media_type = movie.media_type.toLowerCase());
  let detailsPath;
  switch (showType) {
    case "tv":
      detailsPath = `/tv/${id}`;
      break;
    default:
      detailsPath = `/movie/${id}`;
      break;
  }
  const pColor =
    movie.vote_average >= 7
      ? "#21ce79"
      : movie.vote_average >= 3 && movie.vote_average < 7
      ? "#bec02d"
      : "#db2360";
  const tColor =
    movie.vote_average >= 7
      ? "#204529"
      : movie.vote_average >= 3
      ? "#423d0f"
      : movie.vote_average !== 0
      ? "#ff000054"
      : "#565a5b";

  return (
    <div className="F-M-card style_1">
      <div className="card-image__wrapper">
        <div className="card__image">
          <Link className="image-link" to={detailsPath}>
            {poster ? (
              <img
                loading="lazy"
                src={`https://image.tmdb.org/t/p/w500/${poster}`}
                alt={title}
              />
            ) : (
              <div className="no-image"></div>
            )}
          </Link>
        </div>
        <div className="card-options"></div>
      </div>
      <div className="card-content w-100">
        <div className="card-content_rankings">
          <div className="ring">
            <div className="ring-inner">
              <div className="percent">
                <CircularProgressbarWithChildren
                  value={movie.vote_average *10 }
                  styles={buildStyles({
                    pathColor: pColor,
                    trailColor: tColor,
                    backgroundColor: "#032b48",
                  })}
                >
                  <div className="progress_bar_data">
                    <span>
                      {movie.vote_average > 0 ? movie.vote_average * 10 : "NR"}
                    </span>
                    <sup className="sup_class">
                      {movie.vote_average > 0 ? "%" : ""}
                    </sup>
                  </div>
                </CircularProgressbarWithChildren>
              </div>
            </div>
          </div>
        </div>
        <h2 className="m-0">
          <Link to={detailsPath}>{title}</Link>
        </h2>
        <p>
          {new Date(date).toLocaleString("en-US", {
            day: "numeric", // numeric, 2-digit
            year: "numeric", // numeric, 2-digit
            month: "short", // numeric, 2-digit, long, short, narrow
          })}
        </p>
      </div>
    </div>
  );
};

export default FilterMovieCard;
