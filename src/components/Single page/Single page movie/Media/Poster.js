import React, { useState, useEffect } from "react";
import { GetImage } from "../../../../api";
import './poster.css'
const Poster = ({ isMovie, id }) => {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    const getImageData = async () => {
      await GetImage(isMovie, id).then((response) => {
        setImageData(response.data.posters);
      });
    };
    getImageData();
  }, [isMovie, id]);

  return (
    <>
      <div className="poster__container">
        {imageData.map((imageData) => {
          return (
            <div className="poster">
              <img
                src={
                  imageData.file_path
                    ? `https://www.themoviedb.org/t/p/w220_and_h330_face${imageData.file_path}`
                    : ""
                }
                alt="poster"
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Poster;
