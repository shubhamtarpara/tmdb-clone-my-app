import React, { useState } from "react";
import { useEffect } from "react";
import { GetReview } from "../../../api";
import ReviewCard from "./ReviewCard";
import defaultImage from "../../../assets/default.jpg";
import "./reviews.css";

const Reviews = ({ id, isMovie }) => {

  const [review, setReview] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      await GetReview(isMovie, id).then((response) => {
        // console.log(id);
        setReview(response.data.results);
      });
      setLoading(true);
    };
    getData();
  }, [isMovie, id]);

  return (
    <>
      <div className="main-social__section">
        <section className="social-panel">
          <section className="review">
            <div className="social-header">
              <h3 className="social-title">Social</h3>
              <ul>
                <li>
                  <span id="reviews" className="first-media__panel">
                    Reviews <span>{review.length}</span>
                  </span>
                </li>
                <li>
                  <span id="discussions" className="media__panel">
                    Discussions
                  </span>
                </li>
              </ul>
            </div>
            <div className="review-section">
              <div className="review-content">
                {!isLoading
                  ? ""
                  : review &&
                    review.slice(0, 1).map((data) => {
                      return (
                        <ReviewCard
                          key={data.id}
                          author={data.author}
                          authorImage={
                            data.author_details.avatar_path &&
                            data.author_details.avatar_path.startsWith("/http")
                              ? data.author_details.avatar_path.slice(1)
                              : data.author_details.avatar_path === null
                              ? defaultImage
                              : `https://www.themoviedb.org/t/p/w64_and_h64_face${data.author_details.avatar_path}`
                          }
                          rating={data.author_details.rating}
                          created_at={data.created_at}
                          content={data.content}
                          url={data.url}
                        />
                      );
                    })}
              </div>
            </div>
          </section>
        </section>
      </div>
    </>
  );
};

export default Reviews;
