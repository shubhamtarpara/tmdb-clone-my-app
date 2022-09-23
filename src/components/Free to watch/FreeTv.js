import React, { useState, useEffect } from "react";
import { freeToWatchMovieApi } from "../../api";
import thumbnailImage from "../../assets/thumbnail.svg";
import DetailCard from "../DetailCard";

const FreeTv = () => {
  const [popularMovieData, setPopularMovieData] = useState([]);

  useEffect(() => {
    freeToWatchMovieApi("tv", 1).then((response) => {
      setPopularMovieData(response.data.results);
      console.log(response.data.results)
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
            title={free.original_name}
            release_date={free.first_air_date}
            popularity={free.vote_average * 10}
            isMovie={free.release_date ? "movie" : "tv"}
          />
        );
      })}
    </>
  );
};

export default FreeTv;
