import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import thumbnailImage from "./../../../assets/thumbnail.svg";
import "./fullreview.css";
import MovieReviewHeading from "./MovieReviewHeading";
import TvReviewHeading from "./TvReviewHeading";
import { GetReview } from "../../../api";

const FullReview = () => {
  const params = useParams();
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    GetReview(params.isMovie, params.reviewID).then((response) =>
      setReviewData(response.data.results)
    );
  }, [params.reviewID, params.isMovie]);

  return (
    <div className="fullreview-wrapper">
      <div className="container-fluid poster-section p-0">
        {params.isMovie === "movie" ? (
          <MovieReviewHeading id={params.reviewID} />
        ) : (
          <TvReviewHeading id={params.reviewID} />
        )}
      </div>

      <div className="review-content-wrapper d-flex w-100 container ">
        <div className="review-content-left-section me-2 ">
         
        </div>
        <div className="review-content-right-section">
          <div className="review-section">
            <div className="inner-content">
              {reviewData.map((currentReview) => {
                return (
                  <ReviewCard
                    key={currentReview.author}
                    author={currentReview.author}
                    authorImage={
                      currentReview.author_details.avatar_path &&
                      currentReview.author_details.avatar_path.startsWith(
                        "/http"
                      )
                        ? currentReview.author_details.avatar_path.slice(1)
                        : currentReview.author_details.avatar_path === null
                        ? thumbnailImage
                        : `https://www.themoviedb.org/t/p/w64_and_h64_face${currentReview.author_details.avatar_path}`
                    }
                    rating={currentReview.author_details.rating}
                    userLink={`https://www.themoviedb.org/u/${currentReview.author_details.username}`}
                    created_at={currentReview.created_at}
                    content={currentReview.content}
                    url={currentReview.url}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FullReview;
