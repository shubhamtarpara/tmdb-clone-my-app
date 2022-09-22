import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import CatagoryWatchProvider from "./CatagoryWatchProvider";
import MovieCategory from "./TvCategory";
import TvCategory from "./TvCategory";
import { Country } from "./Country";
import { Language } from "./Language";
import { CateKeywordURL } from "../../api";
import { Slider } from "@mui/material";

const MainCatagory = () => {
  const [watchProvider, setWatchProvider] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [sortPanel, setSortPanel] = useState(false);
  const [filterPanel, setFilterPanel] = useState(false);
  const [watchPanel, setWatchPanel] = useState(false);
  const [sortValue, setSortValue] = useState("popularity.desc");
  const [watchCountry, setWatchCountry] = useState("IN");
  const [searchCountry, setSearchCountry] = useState("IN");
  const [curLanguage, setCurLanguage] = useState("en");
  const [fromDate, setFromDate] = useState();
  const [score, setScore] = useState([0, 10]);
  const [miniScore, setMiniScore] = useState(0);
  const [runTime, setRunTime] = useState([0, 400]);
  const [currDate, setCurrDate] = useState(new Date());
  const [url, setUrl] = useState("");
  const [searchSeason, setSearchSeason] = useState(false);

  const params = useParams();

  document.title = `${params.category} ${params.isMovie}- The TMDB`;

  useEffect(() => {
    CateKeywordURL().then((response) => {
      setGenreList(response.data.genres);
    });
  }, []);

  const filterHandler = (e) => {
    if (e.target.id === "sort") {
      setSortPanel((pre) => !pre);
    } else if (e.target.id === "filter") {
      setFilterPanel((pre) => !pre);
    } else if (e.target.id === "watch") {
      setWatchPanel((pre) => !pre);
    }
  };

  const sortHandler = (e) => {
    setSortValue(e.target.value);
  };
  const searchConHandler = (e) => {
    setSearchCountry(e.target.value);
  };
  const watchConHandler = (e) => {
    setWatchCountry(e.target.value);
  };

  const keyWordHandler = (e) => {
    const { id, classList } = e.target;
    classList.toggle("keyword-active");
    if (genreList.includes(id)) {
      setGenreList(genreList.filter((item) => item.id === id));
    } else {
      setGenreList((pre) => [...pre, id]);
    }
  };

  const lanHandler = (e) => {
    setCurLanguage(e.target.value);
  };
  const searchBtnHandler = () => {
    const CurUrl = `&sort_by=${sortValue}&release_date.gte=${
      fromDate ? fromDate.toLocaleString("en-IN") : ""
    }&release_date.lte=${currDate.toLocaleDateString(
      "en-CA"
    )}&with_genres=${genreList.join(
      ","
    )}&with_watch_monetization_types=${watchProvider.join(
      "|"
    )}&with_original_language=${curLanguage}&vote_average.gte=${
      score[0]
    }&vote_average.lte=${
      score[1]
    }&vote_average.gte=${miniScore}&with_runtime.gte=${
      runTime[0]
    }&with_runtime.lte=${runTime[1]}&with_ott_providers=${watchProvider.join(
      "|"
    )}`;
    setUrl(CurUrl);
    setSearchSeason(true);
  };
  return (
    <>
      <div className="category-wrapper container d-flex my-4 flex-column">
        <div className="category-title mt-2">
          <h2>
            {params.category.toUpperCase()} {params.isMovie.toUpperCase()}
          </h2>
        </div>
        <div className="d-flex mt-2 category-responsive">
          <div className="left-category-section w-20">
            <div className="filter-section">
              <div className="filter-panel">
                <div
                  className="filter-name d-flex align-center w-100 justify-content-between flex-nowrap"
                  id="sort"
                  onClick={(e) => filterHandler(e)}
                >
                  <h2 id="sort"></h2>
                  Sort
                  <span
                    id="sort"
                    className={"chevron-right" + (sortPanel ? "rotate" : "")}
                  ></span>
                </div>
                <div
                  className={"filter" + (sortPanel ? "height-100" : "height-0")}
                >
                  <div className="sort-section">
                    <h3>Sort Result By</h3>
                    <span>
                      <select
                        id="sort_by"
                        name="sort_by"
                        className="filter-dropdowmn w-100"
                        onClick={(e) => sortHandler(e)}
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
                        <option value="vote_average.asc">
                          Rating Ascending
                        </option>
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
              <div className="filter-panel mt-3">
                <div
                  className="filter-name d-flex align-self-center w-100 justify-content-between flex-nowrap"
                  id="filters"
                  onClick={(e) => filterHandler(e)}
                >
                  <h2 id="filters">Filters</h2>
                  <span
                    className={"chevron-right" + (filterPanel ? "rotate" : "")}
                    id="filters"
                  ></span>
                </div>
                <div
                  className={
                    "filter" + (filterPanel ? "height-100" : "height-0")
                  }
                >
                  <div className="availabilities-section">
                    <h3>Availabilites</h3>
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
                              onChange={(e) => searchConHandler(e)}
                              value={searchCountry}
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
                            selected={currDate}
                            onChange={(date) => setCurrDate(date)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="genre-section">
                    <h3>Genres</h3>
                    <div className="keyword-wrapper">
                      <ul>
                        {genreList.map((data) => {
                          return (
                            <li
                              key={data.id}
                              id={data.id}
                              onClick={(e) => keyWordHandler(e)}
                            >
                              {data.name}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className="certificate-section">
                    <h3>Certificate</h3>
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
                    <div className="language-wrappe">
                      <span>
                        <select
                          name="language"
                          id="language"
                          className="filter-dropdown w-100"
                          onChange={(e) => lanHandler(e)}
                          value={curLanguage}
                        >
                          {Language.map((data) => {
                            return (
                              <option
                                key={data.iso_639_1}
                                value={data.iso_639_1}
                              >
                                {data.english_name}
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
                      value={score}
                      onChange={(event, newValue) => {
                        setScore(newValue);
                      }}
                      min={0}
                      max={100}
                      step={1}
                      valueLabelDisplay="auto"
                    />
                  </div>
                  <div className="vote-section">
                    <h3>Minimum User Score</h3>
                    <Slider
                      aria-label="Always visible"
                      defaultValue={10}
                      valueLabelDisplay="auto"
                      min={0}
                      max={500}
                      step={50}
                      getAriaValueText={(value) => `${value}m`}
                      onChange={(e) => setMiniScore(e.target.value)}
                    />
                  </div>
                  <div className="runtime-section">
                    <h3>Run Time</h3>
                    <Slider
                      value={runTime}
                      onChange={(event, newValue) => setRunTime(newValue)}
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
                  className="filter-name d-flex align-self-center justify-content-between flex-nowrap w-100"
                  id="watch"
                  onClick={(e) => filterHandler(e)}
                >
                  <h2 id="watch">Where To Watch</h2>
                </div>
                <div
                  className={
                    "fliter" + (watchPanel ? "height-100" : "height-0")
                  }
                >
                  <div className="country-section">
                    <span>
                      <select
                        name="countries"
                        id="country"
                        className="filter-dropdown w-100"
                        onChange={(e) => watchConHandler(e)}
                        value={watchCountry}
                      >
                        {Country.map((countryData) => {
                          return (
                            <option
                              key={countryData.iso_3166_1}
                              value={countryData.iso_3166_1}
                            >
                              {countryData.english_name}
                            </option>
                          );
                        })}
                      </select>
                    </span>
                    <CatagoryWatchProvider
                      watchCountry={watchCountry}
                      watchProvider={watchProvider}
                      setWatchProvider={setWatchProvider}
                    />
                  </div>
                </div>
              </div>
              <div className="search-btn-section mt-3">
                <button
                  className="btn btn-custom w-100"
                  onClick={searchBtnHandler}
                >
                  search
                </button>
              </div>
            </div>
          </div>
          <div className="right-category-section w-80 h-100 mx-auto">
            {!searchSeason ? (params.isMovie ==="movie"? (
              <MovieCategory category={params.category} url={url}/>
            ): (<TvCategory category={params.category} url={url} />)):('')}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainCatagory;
