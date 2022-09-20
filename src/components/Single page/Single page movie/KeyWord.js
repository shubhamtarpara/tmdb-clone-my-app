import React, { useState, useEffect } from "react";
import { GetKeywords } from "../../../api";
import './keyword.css'

const KeyWord = ({ id, isMovie }) => {
  const [keywordsData, setKeywordsData] = useState([]);

  useEffect(() => {
    setKeywordsData([]);
    const GetKeywordsData = async () => {
      await GetKeywords(isMovie, id).then((response) => {
        setKeywordsData(response.data.keywords);
      });
    };
    GetKeywordsData();
  }, [id, isMovie]);
  return (
    <>
      <div className="keywords-container">
        <h3>Keywords</h3>
        <ul>
          {keywordsData.map((data) => {
            return (
              <li key={data.id}>
                <span className="data-name  ">{data.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default KeyWord;
