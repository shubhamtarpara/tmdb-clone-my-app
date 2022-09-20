import React, { useState, useEffect } from "react";
import { theatresDataApi } from "../../api";
import thumbnailImage from "../../assets/thumbnail.svg";
import DetailCard from "../DetailCard";

const InTheaters = () => {
  const [popularMovieData, setPopularMovieData] = useState([]);

  useEffect(() => {
    theatresDataApi('movie').then((response) => {
      setPopularMovieData(response.data.results);
    });
  }, []);
  return (
    <>
      {popularMovieData.map((data) => {
        return (
          <DetailCard
            key={data.key}
            id={data.id}
            poster_path={
              data.poster_path
                ? `https://www.themoviedb.org/t/p/w220_and_h330_face${data.poster_path}`
                : thumbnailImage
            }
            title={data.title}
            release_date={data.release_date}
            popularity={data.vote_average * 10}
            isMovie={data.release_date ? "movie" : "tv"}
          />
        );
      })}
    </>
  );
};

export default InTheaters;
