import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { GetDetails } from "../../api";
import MovieDetailHeaderNavBar from "../Single page/Single page movie/MovieDetailHeaderNavBar";
import SeasionHeading from "./SeasonHeading";

const SeasionDetail = ({ id }) => {
  const params = useParams();
  const [tvData, setTvData] = useState({});

  useEffect(() => {
    GetDetails("tv", params.id).then((response) => {
      setTvData(response.data);
      console.log(response.data);
    });
  }, [params.id]);
  return (
    <>
      <MovieDetailHeaderNavBar />
      <div className=" season-heading-detail">
        <div className="container">
          <SeasionHeading id={params.id} />
        </div>
      </div>

      <div className="all-season-detail-container">
        <div className="season-detail-content">
          {tvData.seasons &&
            tvData.seasons.map((data) => {
              return (
                <div className="season-card container-fluid" key={data.id}>
                  <div className="container season-content">
                    <div className="season-image-container">
                      <img
                        src={
                          data.poster_path
                            ? `https://www.themoviedb.org/t/p/w130_and_h195_bestv2${data.poster_path}`
                            : ""
                        }
                        alt={data.name}
                      />
                    </div>
                    <div className="season-data-container">
                      <div className="season-data-content">
                        <h2>{data && data.name}</h2>
                        <h4 className="season-data-date">
                          {data.air_date && data.air_date.slice(0, 4)}
                          &nbsp;|&nbsp;{data && data.episode_count} Episodes
                        </h4>
                      </div>
                      <div className="season-data-detail">
                        <p>
                          {data && data.name} of {data.name} premiered on
                          {data.air_date &&
                            new Date(data.air_date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default SeasionDetail;
