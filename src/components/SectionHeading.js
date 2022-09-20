import React from "react";
import "./sectionheading.css";
const SectionHeading = ({
  mainHeading,
  sectionHeading,
  selectedTab,
  setSelectedTab,
}) => {
  const dataToggler = (e) => {
    e.preventDefault();
    setSelectedTab(e.currentTarget.id);
  };

  return (
    <>
      <div className="main-header">
        <h2 className="header-container">{sectionHeading}</h2>
        <div className="sub-header__container">
          <div className="slider_container">
            <button
              className={
                "background_color " +
                (selectedTab === "tv" || selectedTab === "week"
                  ? "slider"
                  : selectedTab === "rent"
                  ? "slider_1"
                  : selectedTab === "theatres"
                  ? "slider_2"
                  : "")
              }
            ></button>

            {mainHeading.map((data) => {
              return (
                <div
                  key={data.id}
                  className={
                    "title_tab " +
                    (selectedTab === data.id ? "active" : "inactive")
                  }
                  id={data.id}
                  onClick={dataToggler}
                >
                  <h3>
                    <div>{data.displayTitle}</div>
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SectionHeading;
