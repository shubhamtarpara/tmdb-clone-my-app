import React, { useState, useEffect } from "react";
import { GetVideo } from "../../../../api";
import { GetImage } from "../../../../api";
import thumbnailimage from '../../../../assets/thumbnail.svg'
import Youtube from "react-youtube";
import "./media.css";

const Media = ({ id, isMovie }) => {
  const [video, setVideo] = useState([]);
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    const getVideoData = async () => {
      await GetVideo(isMovie, id).then((response) => {
        const trailer = response.data.results.find(
          (video) => video.name === "Official Trailer"
        );
        setVideo(trailer);
        // console.log(trailer);
      });
    };
    getVideoData();
  }, [isMovie, id]);

  useEffect(() => {
    const getImageData = async () => {
      await GetImage(isMovie, id).then((response) => {
        setImageData(response.data.backdrops);
      });
    };
    getImageData();
  }, [isMovie, id]);

  return (
    <div>
      {video ? (
        <Youtube
          videoId={video.key}
          opts={{
            playerVars: {
              cc_load_policy: 0,
              rel: 0,
              playsinline: 0,
            },
          }}
        />
      ) : (
        <div className="backdrop__container">
          {imageData.map((imageData) => {
            return (
              <div className="backdrop">
                <img
                  src={
                    imageData.file_path
                      ? `https://www.themoviedb.org/t/p/w533_and_h300_bestv2${imageData.file_path}`
                      : thumbnailimage
                  }
                  alt="backdrop"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Media;
