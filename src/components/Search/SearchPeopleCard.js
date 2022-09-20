import React from "react";
import thumbnail from "../../assets/thumbnail.svg";

const SearchPeopleCard = ({ profile_path, name, department, array }) => {
  let mainArray = array
    .map((data) => {
      return data.name || data.title;
    })
    .join(", ");

  return (
    <>
      <div className="card person-content__container">
        <div className="person-img__container">
          <img
            src={
              profile_path
                ? `https://www.themoviedb.org/t/p/w90_and_h90_face${{
                    profile_path,
                  }}`
                : thumbnail
            }
            alt={name}
          />
        </div>
        <div className="person-detail__container">
          <p>{name}</p>
          <p>
            <span>{department}</span> • <span>{mainArray}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default SearchPeopleCard;
