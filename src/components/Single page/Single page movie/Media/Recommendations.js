import React, { useState, useEffect } from "react";
import { GetRecommendation } from "../../../../api";
import { Link } from "react-router-dom";
import calender from "../../../../assets/calender.svg";
import heartRecommendation from "../../../../assets/heartRecommendation.svg";
import assest from "../../../../assets/assest.svg";
import assest1 from "../../../../assets/assest1.svg";
import "./recommendations.css";
const Recommendations = ({ id }) => {
  const [recommendationData, setRecommendationData] = useState([]);
  const [isScroll, setIsScroll] = useState(false);
  //   const [isLoading, setIsLoading] = useState(false);

  const scrollHandler = (e) => {
    setIsScroll(
      e.target.scrollLeft + e.target.offsetWidth >= e.target.scrollWidth - 1050
    );
  };
  useEffect(() => {
    setRecommendationData([]);

    const getData = async () => {
      await GetRecommendation("movie", id).then((response) =>
        setRecommendationData(response.data.results)
      );
      //   setIsLoading(true);
    };

    getData();
    // setIsLoading(false);
  }, [id]);

  return (
    <div className="recommendation__section container">
      <section className="recommendation__container">
        <div className="recommendation-heading">
          <h3>Recommendations</h3>
        </div>

        <div className="scroll-wrapper ">
          <div
            className={
              "scroll-content " + (isScroll ? "" : "fade_up-recommendation")
            }
            onScroll={scrollHandler}
          >
            <div className="recommendation__data ">
              {recommendationData.length !== 0 ? (
                recommendationData.map((recommendationMovie) => {
                  return (
                    <div
                      className="recommendation__card"
                      key={recommendationMovie.id}
                    >
                      <div className="image__content ">
                        <Link
                          to={`/movie/details/${recommendationMovie.id}`}
                          title={recommendationMovie.title}
                          alt={recommendationMovie.title}
                        >
                          <img
                            src={`https://www.themoviedb.org/t/p/w250_and_h141_face${recommendationMovie.backdrop_path}`}
                            alt={recommendationMovie.title}
                          />

                          <div className="hover__data">
                            <span className="hover__date">
                              <img
                                className="recommendation-calender__icon"
                                src={calender}
                                alt="calender"
                              />
                              {recommendationMovie.release_date}
                            </span>
                            <span className="d-flex">
                              <img
                                className="recommendation-icon"
                                src={heartRecommendation}
                                alt="heartRecommendation"
                              />
                              <img
                                className="recommendation-icon"
                                src={assest}
                                alt="assest"
                              />
                              <img
                                className="recommendation-icon"
                                src={assest1}
                                alt=""
                              />
                            </span>
                          </div>
                        </Link>
                      </div>
                      <p className="title__heading">
                        <Link
                          className="title"
                          to={`/movie/details/${recommendationMovie.id}`}
                          title={recommendationMovie.title}
                          alt={recommendationMovie.title}
                        >
                          <bdi>{recommendationMovie.title}</bdi>
                        </Link>
                        <span className="vote_average">
                          {Math.floor(recommendationMovie.vote_average * 10)}%
                        </span>
                      </p>
                    </div>
                  );
                })
              ) : (
                <p>
                  We don't have enough data to suggest any movies. You can help
                  by rating movies you've seen.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Recommendations;
