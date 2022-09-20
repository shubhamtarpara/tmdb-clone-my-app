import React from "react";
import "./mediasectionheading.css";

const MediaSectionHeading = ({
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
      <div className="media-heading">
        <h2 className="media-heading-text">{sectionHeading}</h2>
        <div className="sub-media-container">
          {mainHeading.map((data) => {
            return (
              <div
                key={data.mediaId}
                className={
                  "media_tab " +
                  (selectedTab === data.mediaId ? "active_tab" : "inactive_tab")
                }
                id={data.mediaId}
                onClick={dataToggler}
              >
                <h3>
                  <div className="media-displayTitle">{data.displayTitle}</div>
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MediaSectionHeading;
