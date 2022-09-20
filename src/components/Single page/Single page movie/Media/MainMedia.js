import React, { useState } from "react";
import Backdrops from "./Backdrops";
import Media from "./Media";
import MediaSectionHeading from "./MediaSectionHeading";
import Poster from "./Poster";
import Videos from "./Videos";
import "./mainmedia.css";

const MainMedia = ({ id, isMovie }) => {
  const sectionHeading = "Media";
  const mainHeading = [
    { mediaId: "most-popular", displayTitle: "Most Popular" },
    { mediaId: "videos", displayTitle: "Videos" },
    { mediaId: "backdrops", displayTitle: "Backdrops" },
    { mediaId: "poster", displayTitle: "Poster" },
  ];
  // console.log('mainMedia',id)
  const [selectedTab, setSelectedTab] = useState("most-popular");
  // const [isScroll, setIsScroll] = useState(false);

  // const scrollHandler = (e) => {
  //   setIsScroll(e.target.scrollLeft < 200);
  // };
  return (
    <>
      <div className="main-media">
        <section className="media-container">
          <MediaSectionHeading
            mainHeading={mainHeading}
            sectionHeading={sectionHeading}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          <div
          // className={"media__data " + (isScroll ? "" : "fade_up")}
          // onScroll={scrollHandler}
          >
            <div className="media-data__content">
              {selectedTab === "most-popular" ? (
                <Media id={id} isMovie={isMovie} />
              ) : selectedTab === "videos" ? (
                <Videos id={id} isMovie={isMovie} />
              ) : selectedTab === "backdrops" ? (
                <Backdrops id={id} isMovie={isMovie} />
              ) : selectedTab === "poster" ? (
                <Poster id={id} isMovie={isMovie} />
              ) : (
                ""
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MainMedia;
