import React, { useState, useEffect } from "react";
import { trendingApi } from "../../api";
import thumbnailImage from "../../assets/thumbnail.svg";
import DetailCard from "../DetailCard";

const ThisWeek = () => {
  const [popularMovieData, setPopularMovieData] = useState([]);

  useEffect(() => {
    trendingApi('movie',"week").then((response) => {
      setPopularMovieData(response.data.results);
    });
  }, []);

  return (
    <>
      {popularMovieData.map((today) => {
        return (
          <DetailCard
            key={today.id}
            id={today.id}
            poster_path={
              today.poster_path
                ? `https://www.themoviedb.org/t/p/w220_and_h330_face${today.poster_path}`
                : thumbnailImage
            }
            title={today.title}
            release_date={today.release_date}
            popularity={today.vote_average * 10}
            isMovie={today.release_date ? "movie" : "tv"}
          />
        );
      })}
    </>
  );
};

export default ThisWeek;
