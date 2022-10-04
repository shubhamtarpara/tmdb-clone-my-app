import React from "react";

const SearchCompanyCard = ({ name }) => {
  return (
    <>
      <ul className="search-detail-ul">
        <li className="search-detail-li">{name}</li>
      </ul>
    </>
  );
};

export default SearchCompanyCard;
