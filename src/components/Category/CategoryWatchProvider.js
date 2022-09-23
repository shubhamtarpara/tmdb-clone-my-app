import React, { useState, useEffect } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { GetCategoryWatchProvider } from "../../api";

const CategoryWatchProvider = ({
  currentWatchCountry,
  activeCategoryWatchProvider,
  setActiveCategoryWatchProvider,
}) => {
  const [categoryWatchProvider, setCategoryWatchProvider] = useState([]);

  useEffect(() => {
    setCategoryWatchProvider([]);
    setActiveCategoryWatchProvider([]);

    GetCategoryWatchProvider(currentWatchCountry).then((response) =>
      setCategoryWatchProvider(response.data.results)
    );
  }, [currentWatchCountry]);

  const activeCategoryWatchProviderHandler = (provider_id) => {
    if (activeCategoryWatchProvider.includes(provider_id)) {
      setActiveCategoryWatchProvider(
        activeCategoryWatchProvider.filter((item) => item !== provider_id)
      );
    } else {
      setActiveCategoryWatchProvider((prevState) => [
        ...prevState,
        provider_id,
      ]);
    }
  };

  return (
    <div className="ott-provider-wrapper pt-3">
      <ul className="ott-provider ">
        {categoryWatchProvider.map((data) => {
          return (
            <OverlayTrigger
              placement="top"
              key={data.provider_id}
              overlay={<Tooltip id={`tooltip`}>{data.provider_name}</Tooltip>}
            >
              <li
                className="position-relative hover-li"
                onClick={() => activeCategoryWatchProviderHandler(data.provider_id)}
              >
                <div className="icon-image-container">
                  <img
                    src={`https://www.themoviedb.org/t/p/original/t/p/original${data.logo_path}`}
                    width="50"
                    height="50"
                    alt={data.provider_name}
                  />
                </div>

                <div
                  className={
                    "hover-div " +
                    (activeCategoryWatchProvider.includes(data.provider_id)
                      ? "active-icon-class"
                      : "")
                  }
                >
                  <div className="white-check check "></div>
                </div>
              </li>
            </OverlayTrigger>
          );
        })}
      </ul>
    </div>
  );
};
export default CategoryWatchProvider;
