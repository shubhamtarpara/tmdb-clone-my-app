import React, { useState, useEffect } from "react";
import { GetImage } from "../../../../api";
import thumbnailImage from "../../../../assets/thumbnail.svg";
import "./backdrop.css";

const Backdrops = ({ isMovie, id }) => {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    const getImageData = async () => {
      await GetImage(isMovie, id).then((response) => {
        setImageData(response.data.backdrops);
      });
    };
    getImageData();
  }, [isMovie, id]);
  return (
    <>
      <div className="backdrop__container">
        {imageData.map((imageData) => {
          return (
            <div className="backdrop">
              <img
                src={
                  imageData.file_path
                    ? `https://www.themoviedb.org/t/p/w533_and_h300_bestv2${imageData.file_path}`
                    : thumbnailImage
                }
                alt="backdrop"
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Backdrops;
