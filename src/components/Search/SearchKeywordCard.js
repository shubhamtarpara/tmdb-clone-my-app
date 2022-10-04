import React from "react";

const SearchKeywordCard = ({ name }) => {
  console.log(name);
  return (
    <>
      <ul className="search-detail-ul">
        <li className="search-detail-li">{name}</li>
      </ul>
    </>
  );
};

export default SearchKeywordCard;
