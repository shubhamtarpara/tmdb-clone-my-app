import React, { useState, useEffect } from "react";
import { freeToWatchMovieApi } from "../../api";
import thumbnailImage from "../../assets/thumbnail.svg";
import DetailCard from "../DetailCard";
const FreeMovie = () => {
  const [popularMovieData, setPopularMovieData] = useState([]);

  useEffect(() => {
    freeToWatchMovieApi("movie").then((response) => {
      setPopularMovieData(response.data.results);
    });
  }, []);
  return (
    <>
      {popularMovieData.map((free) => {
        return (
          <DetailCard
            key={free.id}
            id={free.id}
            poster_path={
              free.poster_path
                ? `https://www.themoviedb.org/t/p/w220_and_h330_face${free.poster_path}`
                : thumbnailImage
            }
            title={free.title}
            release_date={free.release_date}
            popularity={free.vote_average * 10}
            isMovie={free.release_date ? "movie" : "tv"}
          />
        );
      })}
    </>
  );
};

export default FreeMovie;
