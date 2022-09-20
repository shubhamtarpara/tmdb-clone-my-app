import React, { useState } from "react";
import "./popular.css";
import Streaming from "./Streaming";
import OnTv from "./OnTv";
import ForRent from "./ForRent";
import InTheaters from "./InTheaters";
import SectionHeading from "../SectionHeading";

const Popular = () => {
  const sectionHeading = "What's Popular";
  const mainHeading = [
    { id: "movie", displayTitle: "Streaming" },
    { id: "tv", displayTitle: "On TV" },
    { id: "rent", displayTitle: "For Rent" },
    { id: "theatres", displayTitle: "In Theatres" },
  ];
  const [selectedTab, setSelectedTab] = useState("movie");
  const [isScroll, setIsScroll] = useState(false);

  const scrollHandler = (e) => {
    // if (
    //   e.target.scrollLeft + e.target.offsetWidth >=
    //   e.target.scrollWidth - 150
    // ) {
    //   console.log("end");
    // }
    // console.log('width',e.target.offsetWidth  );
    // console.log(e.target)
    setIsScroll(
      e.target.scrollLeft + e.target.offsetWidth >= e.target.scrollWidth 
    );
    // console.log('left',e.target.scrollLeft)
    // console.log(e.target.scrollLeft <= e.target.scrollWidth - 300);
  };

  return (
    <>
      <div className="container popular-movie-container" >
        <section className="content_section ">
          <div className="main-popular ">
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
                {selectedTab === "movie" ? (
                  <Streaming />
                ) : selectedTab === "tv" ? (
                  <OnTv />
                ) : selectedTab === "rent" ? (
                  <ForRent />
                ) : selectedTab === "theatres" ? (
                  <InTheaters />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Popular;
