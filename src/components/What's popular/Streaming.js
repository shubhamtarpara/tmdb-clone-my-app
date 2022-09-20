import React, { useState, useEffect } from "react";
import { dataApi } from "../../api";
import thumbnailImage from "../../assets/thumbnail.svg";
import DetailCard from "../DetailCard";

const Streaming = () => {
  const [popularMovieData, setPopularMovieData] = useState([]);

  useEffect(() => {
    dataApi("movie", "popular", 1).then((response) =>
      setPopularMovieData(response.data.results)
  
    );


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {popularMovieData.map((movie) => {
        return (
          <DetailCard
            key={movie.id}
            id={movie.id}
            poster_path={
              movie.poster_path
                ? `https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`
                : thumbnailImage
            }
            title={movie.title}
            release_date={movie.release_date}
            popularity={movie.vote_average * 10}
            isMovie={movie.release_date ? "movie" : "tv"}
          />
        );
      })}
    </>
  );
};

export default Streaming;
