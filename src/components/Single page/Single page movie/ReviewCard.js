import React from "react";
import reviewStar from "../../../assets/star.svg";
import "./reviewcard.css";

const ReviewCard = ({
  author,
  authorImage,
  rating,
  created_at,
  content,
  url,
}) => {
  return (
    <>
      <div className="card review__card" key={author}>
        <div className="main-review__section">
          <div className="author__img">
            <div>
              <img src={authorImage} alt="author_img" />
            </div>
          </div>

          <div className="review__info">
            <div className="review__owner">
              {/* <a href={''}></a> */}A review by {author}
              {rating && (
                <div className="review__rating">
                  <img
                    className="review__icon"
                    src={reviewStar}
                    alt="review_star"
                  />
                  {rating.toFixed(1)}
                </div>
              )}
            </div>
            <h5 className="review__written">
              <p className="review__text">Written by</p> &nbsp;
              <p className="author__name">{author}</p>&nbsp;{" "}
              <p className="review__text">on</p>&nbsp;
              <p className="author__name">
                {new Date(created_at).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </h5>
          </div>
        </div>
        <div className="review__length">
          <pre className="review__content">{content.slice(0, 600)}</pre>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
