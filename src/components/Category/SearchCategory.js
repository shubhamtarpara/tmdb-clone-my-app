import React, { useState, useEffect } from "react";
import DetailCard from "../DetailCard";
import { GetDiscoverData } from "../../api";
import InfiniteScroll from "react-infinite-scroller";
import thumbnailImage from "../../assets/thumbnail.svg";

const SearchCategory = ({ isMovie, url }) => {
  const [categoryData, setCategoryData] = useState([]);
  const [hasMore, setHasMore] = useState([]);

  useEffect(() => {
    GetDiscoverData(isMovie, url, 1).then((response) => {
      setCategoryData(response.data.results);
    });
  }, [isMovie, url]);

  const fetchData = (page) => {
    GetDiscoverData(isMovie, url, page).then((response) => {
      setCategoryData((pre) => {
        response.data.results.length >= 20
          ? setHasMore(true)
          : setHasMore(false);
        return [...pre, ...response.data.results];
      });
    });
  };
  return (
    <>
      <InfiniteScroll
        pageStart={1}
        loadMore={fetchData}
        hasMore={hasMore}
        className="infinite-class"
      >
        {categoryData.length > 0 ? (
          categoryData.map((data) => {
            return (
              <DetailCard
                id={data.id}
                key={data.id}
                poster_path={
                  data.poster_path
                    ? `https://www.themoviedb.org/t/p/w220_and_h330_face/${data.poster_path}`
                    : thumbnailImage
                }
                title={data.title || data.name}
                release_date={data.first_air_date || data.release_date}
                popularity={data.vote_average * 10}
                className={true}
                isMovie={data.first_air_date ? "tv" : "movie"}
              />
            );
          })
        ) : (
          <h6>No results found</h6>
        )}
      </InfiniteScroll>
    </>
  );
};

export default SearchCategory;
