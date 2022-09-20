import React, { useState, useEffect } from "react";
import { GetVideo } from "../../../../api";
import Youtube from "react-youtube";
import "./video.css";

const Videos = ({ id, isMovie }) => {
  const [video, setVideo] = useState([]);

  useEffect(() => {
    const getVideoData = async () => {
      await GetVideo(isMovie, id).then((response) => {
        setVideo(response.data.results);
      });
    };
    getVideoData();
  }, [id, isMovie]);
  return (
    <>
      <div></div>
      <div className="video-container">
        {video.map((data) => {
          return (
            <Youtube
              key={data.key}
              videoId={data.key}
              opts={{
                playerVars: {
                  playsinline: 0,
                },
              }}
            />
          );
        })}
      </div>
    </>
  );
};

export default Videos;
