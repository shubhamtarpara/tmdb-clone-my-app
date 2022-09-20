import React, { useState, useEffect } from "react";
import { GetCredit } from "../../../api";
import "../Single page movie/cast.css";

const Cast = ({ isMovie, id }) => {
  const [castData, setCastData] = useState([]);
  const [isScroll, setIsScroll] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCastData([]);
    const getData = async () => {
      await GetCredit(isMovie, id).then((response) => {
        setCastData(response.data.cast);
      });
      // setIsLoading(true);
    };
    getData();
    // setIsLoading(false);
  }, [id, isMovie]);

  const scrollHandler = (e) => {
    setIsScroll(
      e.target.scrollLeft + e.target.offsetWidth >= e.target.scrollWidth - 150
    );
  };
  return (
    <>
      <div className="cast-section">
        <section className="cast-section__content">
          <h3>{isMovie === "movie" ? "To Billed Cast" : "Series Cast"}</h3>
          <div className="scroll-wrapper position-relative ">
            <div
              className={"scroll-section " + (isScroll ? "" : "fade_up")}
              onScroll={scrollHandler}
            >
              <div className="cast-section-main-content">
                {castData &&
                  castData.slice(0, 9).map((cast) => {
                    return (
                      <div className="card" key={cast.id}>
                        <img
                          src={
                            cast.profile_path
                              ? `https://www.themoviedb.org/t/p/w138_and_h175_face${cast.profile_path}`
                              : ""
                          }
                          alt="one"
                        />
                        <p className="person__name">{cast.name}</p>
                        <p className="char__name">{cast.character}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Cast;
