import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useSearchParams, Link, useParams } from "react-router-dom";
import { GetSearchData } from "../../api";
import SearchCard from "./SearchCard";
import "./searchresult.css";
// import SearchPeopleCard from "./SearchPeopleCard";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const [inputBox, setInputBox] = useState("");
  const query = searchParams.get("query");
  const [movieData, setMovieData] = useState([]);
  const [tvData, setTvData] = useState([]);
  const [collectionData, setCollectionData] = useState([]);
  const [personData, setPersonData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const params = useParams();

  useEffect(() => {
    GetSearchData("movie", query, 1).then((response) =>
      setMovieData(response.data)
    );
    GetSearchData("tv", query, 1).then((response) => setTvData(response.data));

    GetSearchData("collection", query, 1).then((response) =>
      setCollectionData(response.data)
    );

    GetSearchData("person", query, 1).then((response) =>
      setPersonData(response.data)
    );
  }, [query]);

  useEffect(() => {
    setPageNumber(0);

    getSearchData(params.currentData, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.currentData]);

  const getSearchData = (currentData, selected) => {
    switch (currentData) {
      case "movie":
        GetSearchData("movie", query, selected + 1).then((response) =>
          setMovieData(response.data)
        );
        break;
      case "tv":
        GetSearchData("tv", query, selected + 1).then((response) =>
          setTvData(response.data)
        );

        break;
      case "collection":
        GetSearchData("collection", query, selected + 1).then((response) =>
          setCollectionData(response.data)
        );
        break;
      case "people":
        GetSearchData("person", query, selected + 1).then((response) =>
          setPersonData(response.data)
        );
        break;
      default:
        GetSearchData("movie", query, selected + 1).then((response) =>
          setMovieData(response.data)
        );
    }
  };

  const pageChangeHandler = ({ selected }) => {
    setPageNumber(selected);
    getSearchData(params.currentData, selected);
  };

  const pageCount =
    params.currentData === "movie"
      ? movieData.total_pages
      : params.currentData === "tv";

  const inputHandler = (e) => {
    setInputBox(e.target.value);
  };

  return (
    <div className="searchbar-section">
      <div className="searchbar-section-wrapper container-fluid ">
        <div className="searchbar-section-container container">
          <form
            id="search-form"
            action="/search/movie"
            method="get"
            className="d-flex"
          >
            <span className="search-icon"></span>
            <input
              id="search-input"
              name="query"
              type="text"
              placeholder="Search for a movie, tv show, person..."
              value={inputBox}
              className="search-input "
              onChange={inputHandler}
            ></input>
          </form>
        </div>
      </div>
      <div className="search-main-section-wrapper container ">
        <div className="search-link-section">
          <div className="search-link-section-container ">
            <h3 className="search-heading">Search Results</h3>
            <div id="search_menu_scroller" className="search-link-container">
              <ul className="search-link">
                <li
                  className={
                    "" + (params.currentData === "movie" ? "selected" : "")
                  }
                >
                  <Link
                    id="movie"
                    to={`/search/movie?query=${query}`}
                    className="search_tab"
                    title="Movies"
                    alt="Movies"
                  >
                    Movies
                  </Link>
                  <span>{movieData.total_results}</span>
                </li>

                <li
                  className={
                    "" + (params.currentData === "tv" ? "selected" : "")
                  }
                >
                  <Link
                    id="tv"
                    to={`/search/tv?query=${query}`}
                    className="search_tab "
                    title="TV Shows"
                    alt="TV Shows"
                  >
                    TV Shows
                  </Link>
                  <span>{tvData.total_results}</span>
                </li>

                <li
                  className={
                    "" + (params.currentData === "collection" ? "selected" : "")
                  }
                >
                  <Link
                    id="collection"
                    to={`/search/collection?query=${query}`}
                    className="search_tab "
                    title="Collections"
                    alt="Collections"
                  >
                    Collections
                  </Link>
                  <span>{collectionData.total_results}</span>
                </li>

                <li
                  className={
                    "" + (params.currentData === "people" ? "selected" : "")
                  }
                >
                  <Link
                    id="person"
                    to={`/search/people?query=${query}`}
                    className="search_tab "
                    title="People"
                    alt="People"
                  >
                    People
                  </Link>
                  <span>{personData.total_results}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="search-bottom-section">
          <div className="search-bottom-section-wrapper">
            <div className="search-bottom-section-content-wrapper">
              {params.currentData === "movie" &&
                movieData.results &&
                movieData.results.map((data) => (
                  <SearchCard
                    key={data.id}
                    poster_path={data.poster_path}
                    title={data.title}
                    release_date={data.release_date}
                    overview={data.overview}
                  />
                ))}

              {/* {params.currentData === "tv" &&
                searchCollectionData.results &&
                searchTvData.results.map((currentSearchTvData) => (
                  <SearchCard
                    key={currentSearchTvData.id}
                    poster_path={currentSearchTvData.poster_path}
                    title={currentSearchTvData.name}
                    release_date={currentSearchTvData.first_air_date}
                    overview={currentSearchTvData.overview}
                  />
                ))}

              {params.currentData === "collection" &&
                searchCollectionData.results &&
                searchCollectionData.results.map(
                  (currentSearchCollectionData) => (
                    <SearchCard
                      key={currentSearchCollectionData.id}
                      poster_path={currentSearchCollectionData.poster_path}
                      title={currentSearchCollectionData.name}
                      release_date=""
                      overview={currentSearchCollectionData.overview}
                    />
                  )
                )} */}

              {/* {params.currentData === "people" &&
                searchPersonData.results &&
                searchPersonData.results.map((currentSearchPeopleData) => (
                  <SearchCard
                    key={currentSearchPeopleData.id}
                    profile_path={currentSearchPeopleData.profile_path}
                    name={currentSearchPeopleData.name}
                    department={currentSearchPeopleData.known_for_department}
                    known_for_array={currentSearchPeopleData.known_for}
                  />
                ))} */}
            </div>

            {movieData.results && movieData.results.length === 0 && (
              <h6>No results matches your query</h6>
            )}
            <div className="pagination-wrapper">
              <div
                className={
                  "pagination d-flex justify-content-center mt-4 " +
                  (pageCount <= 1 ? "d-none" : "")
                }
              >
                <ReactPaginate
                  previousLabel="< Previous"
                  nextLabel="Next >"
                  pageCount={
                    params.currentData === "movie"
                      ? movieData.total_pages
                      : params.currentData === "tv"
                      ? tvData.total_pages
                      : params.currentData === "collection"
                      ? collectionData.total_pages
                      : personData.total_pages
                  }
                  onPageChange={pageChangeHandler}
                  pageRangeDisplayed={7}
                  activeClassName={"active-page "}
                  disabledClassName={"disable-page "}
                  previousLinkClassName="previous-page"
                  nextLinkClassName="next-page"
                  containerClassName="page-container"
                  forcePage={pageNumber}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
