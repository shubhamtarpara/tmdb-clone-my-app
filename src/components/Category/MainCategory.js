import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './maincategory.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Language } from "./Language";
import { Country } from "./Country";
import MovieCategory from "./MovieCategory";
import CategoryWatchProvider from "./CategoryWatchProvider";
import TvCategory from "./TvCategory";
import SearchCategory from "./SearchCategory";
import Slider from "@mui/material/Slider";
import { CategoryKeywordURL } from "../../api";

const CategorySection = () => {
  const [showSortPanel, setShowSortPanel] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showWatchPanel, setShowWatchPanel] = useState(false);
  const [genreList, setGenreList] = useState([]);
  const [sortValue, setSortValue] = useState("popularity.desc");
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
  const [url, setUrl] = useState("");
  const [showSearchSection, setShowSearchSection] = useState(false);

  const filterPanelHandler = (event) => {
    if (event.target.id === "sort") {
      setShowSortPanel((prevState) => !prevState);
    } else if (event.target.id === "filters") {
      setShowFilterPanel((prevState) => !prevState);
    } else if (event.target.id === "watch") {
      setShowWatchPanel((prevState) => !prevState);
    }
  };
  const params = useParams();

  document.title = `${params.category} ${params.isMovie} - The Movie Database (TMDB)`;

  useEffect(() => {
    CategoryKeywordURL().then((response) => setGenreList(response.data.genres));
  }, []);
  const sortHandler = (e) => {
    setSortValue(e.target.value);
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

  const languageHandler = (e) => {
    setCurrentLanguage(e.target.value);
  };

  const searchBtnHandler = () => {
    const myCurrentURL = `&sort_by=${sortValue}&release_date.gte=${
      fromDate ? fromDate.toLocaleDateString("en-CA") : ""
    }&release_date.lte=${toDate.toLocaleDateString(
      "en-CA"
    )}&with_genres=${activeGenreList.join(
      ","
    )}&with_watch_monetization_types=${activeCategoryWatchProvider.join(
      "|"
    )}&with_original_language=${currentLanguage}&vote_average.gte=${
      userScoreValue[0]
    }&vote_average.lte=${
      userScoreValue[1]
    }&vote_count.gte=${minimumUserVotes}&with_runtime.gte=${
      runtimeUser[0]
    }&with_runtime.lte=${
      runtimeUser[1]
    }&with_ott_providers=${activeCategoryWatchProvider.join("|")}
`;

    setUrl(myCurrentURL);
    setShowSearchSection(true);
  };

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
                <div className="availabilities-section">
                  <h3>Availabilities</h3>
                  <label className="w-100 d-inline-flex align-items-center">
                    <input
                      id="all_availabilities"
                      type="checkbox"
                      className="checkbox-input me-1"
                      name="all_availabilities"
                    />
                    <label
                      htmlFor="all_availabilities"
                      className="all_availabilities"
                    >
                      Search all availabilities?
                    </label>
                  </label>

                  <div className="availabilities-hidden-section ">
                    <label className="w-100 d-inline-flex align-items-center">
                      <input
                        id="stream"
                        type="checkbox"
                        className="checkbox-input me-1"
                        name="stream"
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
                    />
                    <label htmlFor="release" className="release-checkbox">
                      Search all releases?
                    </label>
                  </label>

                  <div>
                    <div className="release-country-section">
                      <label className="w-100 d-inline-flex align-items-center">
                        <input
                          id="countries"
                          type="checkbox"
                          className="checkbox-input me-1"
                          name="countries"
                        />
                        <label htmlFor="countries" className="countries">
                          Search all countries?
                        </label>
                      </label>
                      <div>
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
                                  {currentLanguage.english_name}
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
                        />
                        <label htmlFor="physical" className="physical">
                          Physical
                        </label>
                      </label>
                      <label className="w-100 d-inline-flex align-items-center">
                        <input
                          id="tv"
                          type="checkbox"
                          className="checkbox-input me-1"
                          name="tv"
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

                <div className="certificate-section">
                  <h3>Certification</h3>
                  <div className="certificate-wrapper">
                    <ul>
                      <li>U</li>
                      <li>UA</li>
                      <li>A</li>
                    </ul>
                  </div>
                </div>
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
                              {currentLanguage.english_name}
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
                            {currentLanguage.english_name}
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
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
