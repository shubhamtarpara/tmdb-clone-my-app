import React, { useState, useEffect } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { GetCategoryWatchProvider } from "../../api";

const CatagoryWatchProvider = ({
  watchCountry,
  watchProvider,
  setWatchProvider,
}) => {
  const [categoryWatchProvider, setCategoryWatchProvider] = useState([]);

  useEffect(() => {
    setWatchProvider([]);
    GetCategoryWatchProvider(watchCountry).then((response) => {
      setCategoryWatchProvider(response.data.results);
      // console.log(catagoryWatchProvider)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchCountry]);

  const watchproviderHandler = (watchp_id) => {
    if (watchProvider.includes(watchp_id)) {
      setWatchProvider(watchProvider.filter((item) => item !== watchp_id));
    } else {
      setWatchProvider((pre) => [...pre, watchp_id]);
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
                onClick={() => watchproviderHandler(data.provider_id)}
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
                    (watchProvider.includes(data.provider_id)
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
export default CatagoryWatchProvider;
