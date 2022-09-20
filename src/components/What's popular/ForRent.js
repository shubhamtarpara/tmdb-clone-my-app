import React, { useState, useEffect } from "react";
import { rentDataApi } from "../../api";
import thumbnailImage from "../../assets/thumbnail.svg";
import DetailCard from "../DetailCard";

const ForRent = () => {
  const [popularMovieData, setPopularMovieData] = useState([]);

  useEffect(() => {
    rentDataApi('movie',1).then((response) => {
      setPopularMovieData(response.data.results);
    });
    // console.log(popularMovieData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {popularMovieData.map((rent) => {
        return (
          <DetailCard
            key={rent.id}
            id={rent.id}
            poster_path={
              rent.poster_path
              ? `https://www.themoviedb.org/t/p/w220_and_h330_face${rent.poster_path}`
              : thumbnailImage
            }
            title={rent.title}
            release_date={rent.release_date}
            popularity={rent.vote_average * 10}
            isMovie={rent.release_date ? "movie" : "tv"}
          />
        );
      })}
    </>
  );
};
export default ForRent;
