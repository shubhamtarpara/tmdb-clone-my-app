import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./maincategory.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Language } from "./Language";
import { Country } from "./Country";
import MovieCategory from "./MovieCategory";
import CategoryWatchProvider from "./CategoryWatchProvider";
import TvCategory from "./TvCategory";
import SearchCategory from "./SearchCategory";
import Slider from "@mui/material/Slider";
// import cal from '../../assets/calender.svg'

import { CategoryKeywordURL } from "../../api";

const CategorySection = () => {
  const params = useParams();
  document.title = `${params.category} ${params.isMovie} - The Movie Database (TMDB)`;

  useEffect(() => {
    CategoryKeywordURL().then((response) => setGenreList(response.data.genres));
  }, []);

  const [showSortPanel, setShowSortPanel] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showWatchPanel, setShowWatchPanel] = useState(false);
  const [genreList, setGenreList] = useState([]);
  const [sortValue, setSortValue] = useState("popularity.desc");
  const [monetizationTypes, setMonetizationTypes] = useState([]);
  const [releaseType, setReleaseType] = useState([]);
  const [currentSearchCountry, setCurrentSearchCountry] = useState("IN");
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState(new Date());
  const [currentWatchCountry, setCurrentWatchCountry] = useState("IN");
  const [activeGenreList, setActiveGenreList] = useState([]);
  const [activeCategoryWatchProvider, setActiveCategoryWatchProvider] =
    useState([]);
  const [userScoreValue, setUserScoreValue] = useState([0, 10]);
  const [minimumUserVotes, setMinimumUserVotes] = useState(0);
  const [runtimeUser, setRuntimeUser] = useState([0, 400]);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  // const [certificate, setCertificate] = useState(['PG-13']);
  // const [certificateCountry, setCertificateCountry] = useState("IN");
  const [url, setUrl] = useState("");
  const [showSearchSection, setShowSearchSection] = useState(false);

  const searchBtnHandler = () => {
    const myCurrentURL = `&sort_by=${sortValue}&release_date.gte=${
      fromDate ? fromDate.toLocaleDateString("en-CA") : ""
    }&release_date.lte=${toDate.toLocaleDateString(
      "en-CA"
    )}&with_genres=${activeGenreList.join(
      ","
    )}&with_watch_monetization_types=${activeCategoryWatchProvider.join(
      "|"
    )}&with_release_type=${releaseType.join(
      "|"
    )}&with_original_language=${currentLanguage}&vote_average.gte=${
      userScoreValue[0]
    }&vote_average.lte=${
      userScoreValue[1]
    }&vote_count.gte=${minimumUserVotes}&with_runtime.gte=${
      runtimeUser[0]
    }&with_runtime.lte=${
      runtimeUser[1]
    }&with_ott_providers=${activeCategoryWatchProvider.join(
      "|"
    )}
`;

    setUrl(myCurrentURL);
    setShowSearchSection(true);
  };

  const initialState = {
    all_availabilities: true,
    stream: true,
    free: true,
    ads: true,
    rent: true,
    buy: true,
    release: true,
    countries: true,
    premiere: true,
    theatrical: true,
    theatricalLimited: true,
    digital: true,
    physical: true,
    tv: true,
  };

  const [isChecked, setIsChecked] = useState(initialState);

  useEffect(() => {
    if (isChecked.all_availabilities === true) {
      setMonetizationTypes([]);
    } else {
      if (isChecked.stream === true) {
        if (!monetizationTypes.includes("flatrate")) {
          setMonetizationTypes((prevState) => [...prevState, "flatrate"]);
        }
      } else {
        if (monetizationTypes.includes("flatrate")) {
          setMonetizationTypes(
            monetizationTypes.filter((item) => item !== "flatrate")
          );
        }
      }
      if (isChecked.ads === true) {
        if (!monetizationTypes.includes("ads")) {
          setMonetizationTypes((prevState) => [...prevState, "ads"]);
        }
      } else {
        if (monetizationTypes.includes("ads")) {
          setMonetizationTypes(
            monetizationTypes.filter((item) => item !== "ads")
          );
        }
      }
      if (isChecked.free === true) {
        if (!monetizationTypes.includes("free")) {
          setMonetizationTypes((prevState) => [...prevState, "free"]);
        }
      } else {
        if (monetizationTypes.includes("free")) {
          setMonetizationTypes(
            monetizationTypes.filter((item) => item !== "free")
          );
        }
      }
      if (isChecked.buy === true) {
        if (!monetizationTypes.includes("buy")) {
          setMonetizationTypes((prevState) => [...prevState, "buy"]);
        }
      } else {
        if (monetizationTypes.includes("buy")) {
          setMonetizationTypes(
            monetizationTypes.filter((item) => item !== "buy")
          );
        }
      }
      if (isChecked.rent === true) {
        if (!monetizationTypes.includes("rent")) {
          setMonetizationTypes((prevState) => [...prevState, "rent"]);
        }
      } else {
        if (monetizationTypes.includes("rent")) {
          setMonetizationTypes(
            monetizationTypes.filter((item) => item !== "rent")
          );
        }
      }

      console.log(isChecked);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isChecked.all_availabilities,
    isChecked.buy,
    isChecked.stream,
    isChecked.free,
    isChecked.ads,
    isChecked.rent,
  ]);

  useEffect(() => {
    if (isChecked.release === true) {
      setReleaseType([]);
    } else {
      if (isChecked.premiere === true) {
        if (!releaseType.includes(1)) {
          setReleaseType((prevState) => [...prevState, 1]);
        }
      } else {
        if (releaseType.includes(1)) {
          setReleaseType(releaseType.filter((item) => item !== 1));
        }
      }
      if (isChecked.theatricalLimited === true) {
        if (!releaseType.includes(2)) {
          setReleaseType((prevState) => [...prevState, 2]);
        }
      } else {
        if (releaseType.includes(2)) {
          setReleaseType(releaseType.filter((item) => item !== 2));
        }
      }
      if (isChecked.theatrical === true) {
        if (!releaseType.includes(3)) {
          setReleaseType((prevState) => [...prevState, 3]);
        }
      } else {
        if (releaseType.includes(3)) {
          setReleaseType(releaseType.filter((item) => item !== 3));
        }
      }
      if (isChecked.digital === true) {
        if (!releaseType.includes(4)) {
          setReleaseType((prevState) => [...prevState, 4]);
        }
      } else {
        if (releaseType.includes(4)) {
          setReleaseType(releaseType.filter((item) => item !== 4));
        }
      }
      if (isChecked.physical === true) {
        if (!releaseType.includes(5)) {
          setReleaseType((prevState) => [...prevState, 5]);
        }
      } else {
        if (releaseType.includes(5)) {
          setReleaseType(releaseType.filter((item) => item !== 5));
        }
      }
      if (isChecked.tv === true) {
        if (!releaseType.includes(6)) {
          setReleaseType((prevState) => [...prevState, 6]);
        }
      } else {
        if (releaseType.includes(6)) {
          setReleaseType(releaseType.filter((item) => item !== 6));
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isChecked.release,
    isChecked.premiere,
    isChecked.theatrical,
    isChecked.theatricalLimited,
    isChecked.digital,
    isChecked.physical,
    isChecked.tv,
  ]);

  const filterPanelHandler = (event) => {
    if (event.target.id === "sort") {
      setShowSortPanel((prevState) => !prevState);
    } else if (event.target.id === "filters") {
      setShowFilterPanel((prevState) => !prevState);
    } else if (event.target.id === "watch") {
      setShowWatchPanel((prevState) => !prevState);
    }
  };

  const sortHandler = (e) => {
    setSortValue(e.target.value);
  };

  const checkBoxHandler = (e) => {
    const { name } = e.target;
    setIsChecked((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const searchCountryHandler = (e) => {
    setCurrentSearchCountry(e.target.value);
  };

  const watchCountryHandler = (e) => {
    setCurrentWatchCountry(e.target.value);
  };

  const keywordsHandler = (e) => {
    const { id, classList } = e.target;
    classList.toggle("keyword-active");
    if (activeGenreList.includes(id)) {
      setActiveGenreList(activeGenreList.filter((item) => item !== id));
    } else {
      setActiveGenreList((prevState) => [...prevState, id]);
    }
  };

  // const certificateHandler = (e) => {
  //   const {id, classList} = e.target;
  //   classList.toggle("certificate-active");
  // }

  const languageHandler = (e) => {
    setCurrentLanguage(e.target.value);
  };

  const userScore = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 5,
      label: "5",
    },
    {
      value: 10,
      label: "10",
    },
  ];

  const minimumUserVote = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 100,
      label: "100",
    },
    {
      value: 200,
      label: "200",
    },
    {
      value: 300,
      label: "300",
    },
    {
      value: 400,
      label: "400",
    },
    {
      value: 500,
      label: "500",
    },
  ];

  const runtimeUserMarks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 120,
      label: "120",
    },
    {
      value: 240,
      label: "240",
    },
    {
      value: 360,
      label: "360",
    },
  ];

  return (
    <div className="category-wrapper container d-flex my-4 flex-column ">
      <div className="category-title mt-2">
        <h2>
          {params.category.toUpperCase()} {params.isMovie.toUpperCase()}
        </h2>
      </div>
      <div className="d-flex mt-2 category-responsive">
        <div className="left-category-section w-20 ">
          <div className="filter-section">
            <div className="filter-panel">
              <div
                className="filter-name d-flex align-self-center w-100 justify-content-between flex-nowrap "
                id="sort"
                onClick={(e) => filterPanelHandler(e)}
              >
                <h2 id="sort">Sort</h2>
                <span
                  id="sort"
                  className={"chevron-right " + (showSortPanel ? "rotate" : "")}
                ></span>
              </div>

              <div
                className={
                  "filter " + (showSortPanel ? "height-100" : "height-0")
                }
              >
                <div className="sort-section">
                  <h3>Sort Results By</h3>
                  <span>
                    <select
                      id="sort_by"
                      name="sort_by"
                      className="filter-dropdown w-100"
                      onChange={(e) => sortHandler(e)}
                    >
                      <option value="popularity.desc">
                        Popularity Descending
                      </option>
                      <option value="popularity.asc">
                        Popularity Ascending
                      </option>
                      <option value="vote_average.desc">
                        Rating Descending
                      </option>
                      <option value="vote_average.asc">Rating Ascending</option>
                      <option value="primary_release_date.desc">
                        Release Date Descending
                      </option>
                      <option value="primary_release_date.asc">
                        Release Date Ascending
                      </option>
                      <option value="original_title.asc">Title (A-Z)</option>
                      <option value="original_title.desc">Title (Z-A)</option>
                    </select>
                  </span>
                </div>
              </div>
            </div>
            <div className="filter-panel my-3">
              <div
                className="filter-name d-flex align-self-center w-100 justify-content-between flex-nowrap"
                id="filters"
                onClick={(e) => filterPanelHandler(e)}
              >
                <h2 id="filters">Filters</h2>
                <span
                  id="filters"
                  className={
                    "chevron-right " + (showFilterPanel ? "rotate" : "")
                  }
                ></span>
              </div>

              <div
                className={
                  "filter " + (showFilterPanel ? "height-100" : "height-0")
                }
              >
                <div className="show-me-section">
                  <h3>Show Me</h3>
                  <label className="w-100 d-inline-flex align-items-center">
                    <input
                      id="all_availabilities"
                      type="checkbox"
                      className="checkbox-input round-checkbox-input me-1"
                      name="all_availabilities"
                      disabled
                      defaultChecked={true}
                    />
                    <label
                      htmlFor="all_availabilities"
                      className="all_availabilities"
                    >
                      Everything
                    </label>
                  </label>
                  <label className="w-100 d-inline-flex align-items-center">
                    <input
                      id="all_availabilities"
                      type="checkbox"
                      className="checkbox-input round-checkbox-input me-1"
                      name="all_availabilities"
                      disabled
                    />
                    <label
                      htmlFor="all_availabilities"
                      className="all_availabilities disabled-checkbox"
                    >
                      Movies I Haven't Seen
                    </label>
                  </label>
                  <label className="w-100 d-inline-flex align-items-center">
                    <input
                      id="all_availabilities"
                      type="checkbox"
                      className="checkbox-input round-checkbox-input me-1"
                      name="all_availabilities"
                      disabled
                    />
                    <label
                      htmlFor="all_availabilities"
                      className="all_availabilities disabled-checkbox"
                    >
                      Movies I Have Seen
                    </label>
                  </label>
                </div>
                <div className="availabilities-section">
                  <h3>Availabilities</h3>

                  <label className="w-100 d-inline-flex align-items-center">
                    <input
                      id="all_availabilities"
                      type="checkbox"
                      className="checkbox-input me-1"
                      name="all_availabilities"
                      onChange={checkBoxHandler}
                      checked={isChecked.all_availabilities}
                    />
                    <label
                      htmlFor="all_availabilities"
                      className="all_availabilities"
                    >
                      Search all availabilities?
                    </label>
                  </label>

                  <div
                    className={
                      "availabilities-hidden-section " +
                      (isChecked.all_availabilities ? "d-none" : "")
                    }
                  >
                    <label className="w-100 d-inline-flex align-items-center">
                      <input
                        id="stream"
                        type="checkbox"
                        className="checkbox-input me-1"
                        name="stream"
                        onChange={(e) => checkBoxHandler(e)}
                        checked={isChecked.stream}
                      />
                      <label htmlFor="stream" className="stream">
                        Stream
                      </label>
                    </label>
                    <label className="w-100 d-inline-flex align-items-center">
                      <input
                        id="free"
                        type="checkbox"
                        className="checkbox-input me-1"
                        name="free"
                        onChange={(e) => checkBoxHandler(e)}
                        checked={isChecked.free}
                      />
                      <label htmlFor="free" className="free">
                        Free
                      </label>
                    </label>
                    <label className="w-100 d-inline-flex align-items-center">
                      <input
                        id="ads"
                        type="checkbox"
                        className="checkbox-input me-1"
                        name="ads"
                        onChange={(e) => checkBoxHandler(e)}
                        checked={isChecked.ads}
                      />
                      <label htmlFor="ads" className="ads">
                        Ads
                      </label>
                    </label>
                    <label className="w-100 d-inline-flex align-items-center">
                      <input
                        id="rent"
                        type="checkbox"
                        className="checkbox-input me-1"
                        name="rent"
                        onChange={(e) => checkBoxHandler(e)}
                        checked={isChecked.rent}
                      />
                      <label htmlFor="rent" className="rent">
                        Rent
                      </label>
                    </label>
                    <label className="w-100 d-inline-flex align-items-center">
                      <input
                        id="buy"
                        type="checkbox"
                        className="checkbox-input me-1"
                        name="buy"
                        onChange={(e) => checkBoxHandler(e)}
                        checked={isChecked.buy}
                      />
                      <label htmlFor="buy" className="buy">
                        Buy
                      </label>
                    </label>
                  </div>
                </div>

                <div className="release-section">
                  <h3>Release Dates</h3>

                  <label className="w-100 d-inline-flex align-items-center">
                    <input
                      id="release"
                      type="checkbox"
                      className="checkbox-input me-1"
                      name="release"
                      checked={isChecked.release}
                      onChange={(e) => checkBoxHandler(e)}
                    />
                    <label htmlFor="release" className="release-checkbox">
                      Search all releases?
                    </label>
                  </label>

                  <div
                    className={
                      "releases-hidden-section " +
                      (isChecked.release ? "d-none" : "")
                    }
                  >
                    <div className="release-country-section">
                      <label className="w-100 d-inline-flex align-items-center">
                        <input
                          id="countries"
                          type="checkbox"
                          className="checkbox-input me-1"
                          name="countries"
                          checked={isChecked.countries}
                          onChange={(e) => checkBoxHandler(e)}
                        />
                        <label htmlFor="countries" className="countries">
                          Search all countries?
                        </label>
                      </label>

                      <div
                        className={
                          "countries-input-section py-2 " +
                          (isChecked.countries ? "d-none" : "")
                        }
                      >
                        <span>
                          <select
                            id="searchCountries"
                            name="searchCountries"
                            className="filter-dropdown w-100"
                            onChange={(e) => searchCountryHandler(e)}
                            value={currentSearchCountry}
                          >
                            {Country.map((currentLanguage) => {
                              return (
                                <option
                                  key={currentLanguage.iso_3166_1}
                                  value={currentLanguage.iso_3166_1}
                                >
                                  {currentLanguage.english_name}{" "}
                                </option>
                              );
                            })}
                          </select>
                        </span>
                      </div>
                    </div>
                    <div className="watch-provider-section">
                      <label className="w-100 d-inline-flex align-items-center">
                        <input
                          id="premiere"
                          type="checkbox"
                          className="checkbox-input me-1"
                          name="premiere"
                          checked={isChecked.premiere}
                          onChange={(e) => checkBoxHandler(e)}
                        />
                        <label htmlFor="premiere" className="premiere">
                          Premiere
                        </label>
                      </label>
                      <label className="w-100 d-inline-flex align-items-center">
                        <input
                          id="theatrical-limited"
                          type="checkbox"
                          className="checkbox-input me-1"
                          name="theatricalLimited"
                          checked={isChecked.theatricalLimited}
                          onChange={(e) => checkBoxHandler(e)}
                        />
                        <label
                          htmlFor="theatrical-limited"
                          className="theatrical-limited"
                        >
                          Theatrical (limited)
                        </label>
                      </label>
                      <label className="w-100 d-inline-flex align-items-center">
                        <input
                          id="theatrical"
                          type="checkbox"
                          className="checkbox-input me-1"
                          name="theatrical"
                          checked={isChecked.theatrical}
                          onChange={(e) => checkBoxHandler(e)}
                        />
                        <label htmlFor="theatrical" className="theatrical">
                          Theatrical
                        </label>
                      </label>
                      <label className="w-100 d-inline-flex align-items-center">
                        <input
                          id="digital"
                          type="checkbox"
                          className="checkbox-input me-1"
                          name="digital"
                          checked={isChecked.digital}
                          onChange={(e) => checkBoxHandler(e)}
                        />
                        <label htmlFor="digital" className="digital">
                          Digital
                        </label>
                      </label>
                      <label className="w-100 d-inline-flex align-items-center">
                        <input
                          id="physical"
                          type="checkbox"
                          className="checkbox-input me-1"
                          name="physical"
                          checked={isChecked.physical}
                          onChange={(e) => checkBoxHandler(e)}
                        />
                        <label htmlFor="physical" className="physical">
                          Physical
                        </label>
                      </label>
                      <label className=" d-inline-flex align-items-center">
                        <input
                          id="tv"
                          type="checkbox"
                          className="checkbox-input me-1"
                          name="tv"
                          checked={isChecked.tv}
                          onChange={(e) => checkBoxHandler(e)}
                        />
                        <label htmlFor="tv" className="tv">
                          TV
                        </label>
                      </label>
                    </div>
                  </div>

                  <div className="date-picker-section">
                    <div className="from-section d-flex justify-content-between">
                      <div className="w-5">
                        <span>from</span>
                      </div>

                      <div className="date-picker-container d-flex justify-content-end">
                        <DatePicker
                          selected={fromDate}
                          onChange={(date) => setFromDate(date)}
                        />
                        {/* <span className="datepicker-cal"><img src={cal} alt="" /></span> */}
                      </div>
                    </div>
                    <div className="to-section d-flex justify-content-between mt-2">
                      <div className="w-5">
                        <span>to</span>
                      </div>
                      <div className="date-picker-container d-flex justify-content-end">
                        <DatePicker
                          selected={toDate}
                          onChange={(date) => setToDate(date)}
                        />
                        {/* <span className="datepicker-cal"><img src={cal} alt="" /></span> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="genre-section">
                  <h3>Genres</h3>

                  <div className="keyword-wrapper">
                    <ul>
                      {genreList.map((keyword) => {
                        return (
                          <li
                            key={keyword.id}
                            id={keyword.id}
                            onClick={(e) => keywordsHandler(e)}
                          >
                            {keyword.name}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
{/* 
                <div className="certificate-section">
                  <h3>Certification</h3>
                  <div className="certificate-wrapper">
                    <ul>
                      <li>U</li>
                      <li>UA</li>
                      <li>A</li>
                    </ul>
                  </div>
                </div> */}

                <div className="language-section">
                  <h3>Language</h3>
                  <div className="language-wrapper">
                    <span>
                      <select
                        id="languages"
                        name="languages"
                        className="filter-dropdown w-100"
                        onChange={(e) => languageHandler(e)}
                        value={currentLanguage}
                      >
                        {Language.map((currentLanguage) => {
                          return (
                            <option
                              key={currentLanguage.iso_639_1}
                              value={currentLanguage.iso_639_1}
                            >
                              {currentLanguage.english_name}{" "}
                            </option>
                          );
                        })}
                      </select>
                    </span>
                  </div>
                </div>

                <div className="user-score-section">
                  <h3>User Score</h3>

                  <Slider
                    value={userScoreValue}
                    onChange={(event, newValue) => {
                      setUserScoreValue(newValue);
                    }}
                    min={0}
                    max={10}
                    step={1}
                    marks={userScore}
                    valueLabelDisplay="auto"
                  />
                </div>

                <div className="votes-section">
                  <h3>Minimum User Score</h3>

                  <Slider
                    aria-label="Always visible"
                    defaultValue={10}
                    valueLabelDisplay="auto"
                    min={0}
                    max={500}
                    step={50}
                    marks={minimumUserVote}
                    getAriaValueText={(value) => `${value}m`}
                    onChange={(e) => setMinimumUserVotes(e.target.value)}
                  />
                </div>
                <div className="runtime-section">
                  <h3>Runtime</h3>

                  <Slider
                    value={runtimeUser}
                    onChange={(event, newValue) => {
                      setRuntimeUser(newValue);
                    }}
                    min={0}
                    max={400}
                    step={15}
                    marks={runtimeUserMarks}
                    valueLabelDisplay="auto"
                  />
                </div>
              </div>
            </div>
            <div className="filter-panel">
              <div
                className="filter-name d-flex align-self-center w-100 justify-content-between flex-nowrap"
                id="watch"
                onClick={(e) => filterPanelHandler(e)}
              >
                <h2 id="watch">Where to Watch</h2>
                <span
                  id="watch"
                  className={
                    "chevron-right " + (showWatchPanel ? "rotate" : "")
                  }
                ></span>
              </div>

              <div
                className={
                  "filter " + (showWatchPanel ? "height-100" : "height-0")
                }
              >
                <div className="country-section">
                  <span>
                    <select
                      id="country"
                      name="countries"
                      className="filter-dropdown w-100"
                      onChange={(e) => watchCountryHandler(e)}
                      value={currentWatchCountry}
                    >
                      {Country.map((currentLanguage) => {
                        return (
                          <option
                            key={currentLanguage.iso_3166_1}
                            value={currentLanguage.iso_3166_1}
                          >
                            {currentLanguage.english_name}{" "}
                          </option>
                        );
                      })}
                    </select>
                  </span>

                  <CategoryWatchProvider
                    currentWatchCountry={currentWatchCountry}
                    activeCategoryWatchProvider={activeCategoryWatchProvider}
                    setActiveCategoryWatchProvider={
                      setActiveCategoryWatchProvider
                    }
                  />
                </div>
              </div>
            </div>

            <div className="search-btn-section mt-3">
              <button
                className="btn btn-custom w-100"
                onClick={searchBtnHandler}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="right-category-section w-80 h-100 mx-auto">
          {!showSearchSection ? (
            params.isMovie === "movie" ? (
              <MovieCategory category={params.category} url={url} />
            ) : (
              <TvCategory category={params.category} url={url} />
            )
          ) : (
            <SearchCategory url={url} isMovie={params.isMovie} />
          )}

          {/* <div className="load-more-btn-section  w-100 m-4">
            <button className="btn btn-custom btn-load w-100">Load More</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
