import React, { useState } from "react";
import FreeMovie from "./FreeMovie";
import FreeTv from "./FreeTv";
import SectionHeading from "../SectionHeading";

const FreeToWatch = () => {
  const sectionHeading = "Free To Watch";
  const mainHeading = [
    { id: "movie", displayTitle: "Movies" },
    { id: "tv", displayTitle: "TV" },
  ];
  const [selectedTab, setSelectedTab] = useState("movie");
  const [isScroll, setIsScroll] = useState(false);

  const scrollHandler = (e) => {
    setIsScroll(
      e.target.scrollLeft + e.target.offsetWidth >= e.target.scrollWidth - 2050
    );
  };

  return (
    <>
      <div className="container free-to-watch-container ">
        <section className="content_section">
          <div className="main-popular">
            <SectionHeading
              mainHeading={mainHeading}
              sectionHeading={sectionHeading}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
            <div
              className={"show__data " + (isScroll ? "" : "fade_up")}
              onScroll={scrollHandler}
            >
              <div className="show-data__content">
                {selectedTab === "movie" ? <FreeMovie /> : <FreeTv />}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FreeToWatch;
