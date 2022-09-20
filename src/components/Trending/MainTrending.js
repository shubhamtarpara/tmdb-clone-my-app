import React, { useState } from "react";
import Today from "./Today";
import ThisWeek from "./ThisWeek";
import SectionHeading from "../SectionHeading";
import './maintrending.css'

const MainTrending = () => {
  const sectionHeading = "Trending";
  const mainHeading = [
    { id: "today", displayTitle: "Today" },
    { id: "week", displayTitle: "ThisWeek" },
  ];
  const [selectedTab, setSelectedTab] = useState("today");
  const [isScroll, setIsScroll] = useState(false);

  const scrollHandler = (e) => {
    setIsScroll( e.target.scrollLeft + e.target.offsetWidth >= e.target.scrollWidth - 2050);
  };
  return (
    <>
      <div className="container trending">
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
                {selectedTab === "today" ? <Today /> : <ThisWeek />}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MainTrending;
