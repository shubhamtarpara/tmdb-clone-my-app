import React, { useState, useEffect } from "react";
import { dataApi } from "../../api";
import thumbnailImage from "../../assets/thumbnail.svg";
import DetailCard from "../DetailCard";

const OnTv = () => {
  const [popularMovieData, setPopularMovieData] = useState([]);

  useEffect(() => {
    dataApi("tv", "popular", 1).then((response) =>
      setPopularMovieData(response.data.results)
      );
    // console.log('OnTv',popularMovieData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {popularMovieData.map((tv) => {
        return (
          <DetailCard
            key={tv.id}
            id={tv.id}
            poster_path={
              tv.poster_path
                ? `https://www.themoviedb.org/t/p/w220_and_h330_face${tv.poster_path}`
                : thumbnailImage
            }
            title={tv.original_name}
            release_date={tv.first_air_date}
            popularity={tv.vote_average * 10}
            isMovie={tv.release_date ? "movie" : "tv"}
            
          />
        );
      })}
    </>
  );
};

export default OnTv;
