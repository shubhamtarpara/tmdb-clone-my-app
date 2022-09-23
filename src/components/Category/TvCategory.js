import React, { useState, useEffect } from "react";
import DetailCard from "../DetailCard";
import thumbnailImage from "../../assets/thumbnail.svg";
import { GetCategoryData } from "../../api";
import InfiniteScroll from "react-infinite-scroller";

const MovieCategory = ({ category }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [moreData, setMoreData] = useState(false);

  useEffect(() => {
    GetCategoryData([]);
    GetCategoryData("tv", category, 1).then((response) => {
      setCategoryData(response.data.results);
    });
  }, [category]);

  const fetchData = (page) => {
    GetCategoryData("tv", category, page).then((response) =>
      setCategoryData((prevState) => {
        response.data.results.length >= 20
          ? setMoreData(true)
          : setMoreData(false);
        return [...prevState, ...response.data.results];
      })
    );
  };

  return (
    <>
      <InfiniteScroll
        pageStart={1}
        loadMore={fetchData}
        hasMore={moreData}
        className="infinite-class"
      >
        {categoryData.map((data) => {
          return (
            <DetailCard
              id={data.id}
              key={data.id}
              poster_path={
                data.poster_path
                  ? `https://www.themoviedb.org/t/p/w220_and_h330_face/${data.poster_path}`
                  : thumbnailImage
              }
              title={data.original_name}
              release_date={data.first_air_date}
              popularity={data.vote_average * 10}
              className={true}
              isMovie="tv"
            />
          );
        })}
      </InfiniteScroll>
    </>
  );
};

export default MovieCategory;
