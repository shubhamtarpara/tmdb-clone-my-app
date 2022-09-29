/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  Dropdown,
  Accordion,
  OverlayTrigger,
  Tooltip,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { API, API_URL } from "../../Constants";
import FilterMovieCard from "./FilterMovieCard";
import "react-datepicker/dist/react-datepicker.css";
import "./maincategory.css";
import getInitialParams from "./Params";
import SortSectionAccordian from "./SortSection";
import FilterSectionAccordian from "./FilterSection";

const CategoryPage = () => {
  const { showType, categoryType } = useParams();
  const [movies, setMovies] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [totalPages, setTotalPages] = useState(null);
  const [dropdownTitle, setDropdownTitle] = useState("Popularity Descending");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [genresList, setGenresList] = useState(null);
  const [activeGenresArray, setActiveGenresArray] = useState([]);
  const [CertificationList, setCertificationList] = useState(null);
  const [activeCertificationsArray, setActiveCertificationsArray] = useState([]);
  const [countriesList, setCountriesList] = useState(null);
  const [ottRegionsList, setOttRegionsList] = useState(null);
  const [ottProvidersList, setOttProvidersList] = useState(null);
  const [activeOttProviders, setActiveOttProviders] = useState([]);
  const [progress, setProgress] = useState(10);
  const [isAllAvailabilities, setIsAllAvailabilities] = useState(true);
  const [isAllReleases, setIsAllReleases] = useState(true);
  const [isAllCountries, setIsAllCountries] = useState(true);
  const [languagesList, setLanguagesList] = useState(null);

  const [defaultParams, setDefaultParams] = useState(
    getInitialParams(showType, categoryType)
  );
  const [urlParams, setUrlParams] = useState(
    getInitialParams(showType, categoryType)
  );

  useEffect(() => {
    setUrlParams(getInitialParams(showType, categoryType));
    setDefaultParams(getInitialParams(showType, categoryType));
  }, [showType, categoryType]);


  const generateUrl = useCallback(
    (params) => {
      let url = `${API_URL}/discover/${showType}?api_key=${API}`;
      Object.keys(params).forEach((key) => {
        if (params[key]) {
          url = `${url}&${key}=${params[key]}`;
        }
      });
      return url;
    },
    [showType]
  );

  const [discoverUrl, setDiscoverUrl] = useState(generateUrl(urlParams));

  useEffect(() => {
    setDiscoverUrl(generateUrl(defaultParams));
  }, [defaultParams, generateUrl]);





  useEffect(() => {
    switch (urlParams.sort_by) {
      case "popularity.desc":
        setDropdownTitle("Popularity Descending");
        break;
      case "popularity.asc":
        setDropdownTitle("Popularity Ascending");
        break;
      case "vote_average.desc":
        setDropdownTitle("Rating Descending");
        break;
      case "vote_average.asc":
        setDropdownTitle("Rating Ascending");
        break;
      case "primary_release_date.desc":
        setDropdownTitle("Release Date Descending");
        break;
      case "primary_release_date.asc":
        setDropdownTitle("Release Date Ascending");
        break;
      case "title.asc":
        setDropdownTitle("Title (A-Z)");
        break;
      case "title.desc":
        setDropdownTitle("Title (Z-A)");
        break;
      default:
        setDropdownTitle("Popularity Descending");
        break;
    }
  }, [urlParams.sort_by]);


  const toggleAllAvailabilities = () => {
    setIsAllAvailabilities(!isAllAvailabilities);
  };

  const [activeAvalabilitiesArray, setActiveAvalabilitiesArray] = useState([
    "flatrate",
    "free",
    "ads",
    "rent",
    "buy",
  ]);
  const toggleActiveAvalabilities = (availability) => {
    if (activeAvalabilitiesArray.includes(availability)) {
      setActiveAvalabilitiesArray(
        activeAvalabilitiesArray.filter((item) => item !== availability)
      );
    } else {
      setActiveAvalabilitiesArray([...activeAvalabilitiesArray, availability]);
    }
  };

  useEffect(() => {
    if (urlParams.with_release_type !== "") {
      setIsAllReleases(false);
    } else {
      setIsAllReleases(true);
    }
  }, [defaultParams.with_release_type, urlParams.with_release_type]);

  const toggleAllReleaseDates = () => {
    setIsAllReleases(!isAllReleases);
  };

  const [activeReleaseTypesArray, setActiveReleaseTypesArray] = useState(
    urlParams.with_release_type
      ? urlParams?.with_release_type.split("|")
      : ["1", "2", "3", "4", "5", "6"]
  );

  const toggleActiveReleases = (release) => {
    if (activeReleaseTypesArray.includes(release)) {
      setActiveReleaseTypesArray(
        activeReleaseTypesArray.filter((item) => item !== release)
      );
    } else {
      setActiveReleaseTypesArray([...activeReleaseTypesArray, release]);
    }
  };

  const toggleAllCountries = () => {
    setIsAllCountries(!isAllCountries);
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    setMovies(null);
    setHasMore(false);
    setTotalPages(null);

    fetch(discoverUrl)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setLoading(false);
        setProgress(100);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [urlParams.page, showType, categoryType, discoverUrl]);

  useEffect(() => {
    const fetchFilter = async () => {
      try {
        const filterResponse = await fetch(
          `${API_URL}/genre/${
            showType === "tv" ? "tv/" : "movie/"
          }list?api_key=${API}&language=en-US`
        );
        const data = await filterResponse.json();
        setGenresList(data.genres);
      } catch (error) {
        setError(error);
      }
    };
    fetchFilter();
  }, [showType]);

  useEffect(() => {
    const fetchOttProviders = async () => {
      try {
        const ottProvidersResponse = await fetch(
          `${API_URL}/watch/providers/movie?api_key=${API}&language=en-US&watch_region=${urlParams.ott_region}`
        );
        const data = await ottProvidersResponse.json();
        setOttProvidersList(data.results);
      } catch (error) {
        setError(error);
      }
    };
    fetchOttProviders();
  }, [urlParams.ott_region]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const languagesResponse = await fetch(
          `${API_URL}/configuration/languages?api_key=${API}`
        );
        const data = await languagesResponse.json();
        setLanguagesList(
          data.sort((a, b) => {
            if (a.english_name < b.english_name) return -1;
            if (a.english_name > b.english_name) return 1;
            return 0;
          })
        );
      } catch (error) {
        setError(error);
      }
    };
    fetchLanguages();

    const fetchCountries = async () => {
      try {
        const countriesResponse = await fetch(
          `${API_URL}/configuration/countries?api_key=${API}`
        );
        const data = await countriesResponse.json();
        setCountriesList(
          data.sort((a, b) => {
            if (a.english_name < b.english_name) return -1;
            if (a.english_name > b.english_name) return 1;
            return 0;
          })
        );
      } catch (error) {
        setError(error);
      }
    };
    fetchCountries();

    const fetchOttRegions = async () => {
      try {
        const ottRegionsResponse = await fetch(
          `${API_URL}/watch/providers/regions?api_key=${API}`
        );
        const data = await ottRegionsResponse.json();
        setOttRegionsList(
          data.results.sort((a, b) => {
            if (a.english_name < b.english_name) return -1;
            if (a.english_name > b.english_name) return 1;
            return 0;
          })
        );
      } catch (error) {
        setError(error);
      }
    };
    fetchOttRegions();

    const fetchCertification = async () => {
      try {
        const certificationResponse = await fetch(
          `${API_URL}/certification/movie/list?api_key=${API}&language=en-US`
        );
        const data = await certificationResponse.json();
        setCertificationList(data.certifications.IN);
      } catch (error) {
        setError(error);
      }
    };
    fetchCertification();
  }, []); //Fetch countries and certification list

  useEffect(() => {
    setUrlParams({
      ...urlParams,
      with_ott_monetization_types:
        activeAvalabilitiesArray.length > 0 &&
        activeAvalabilitiesArray.join("%7C"),
    });
  }, [activeAvalabilitiesArray]);

  useEffect(() => {
    setUrlParams({
      ...urlParams,
      with_ott_providers:
        activeOttProviders.length > 0 && activeOttProviders.join("%7C"),
    });
  }, [activeOttProviders]);

  useEffect(() => {
    setActiveOttProviders([]);
    setUrlParams({
      ...urlParams,
      with_ott_providers: "",
    });
  }, [urlParams.ott_region]);

  useEffect(() => {
    setUrlParams({
      ...urlParams,
      certification:
        activeCertificationsArray.length > 0 &&
        activeCertificationsArray.join("%7C"),
    });
  }, [activeCertificationsArray]);

  useEffect(() => {
    setUrlParams({
      ...urlParams,
      with_genres:
        activeGenresArray.length > 0 && activeGenresArray.join("%2C"),
    });
  }, [activeGenresArray]);

  useEffect(() => {
    setUrlParams({
      ...urlParams,
      with_release_type:
        activeReleaseTypesArray.length > 0 &&
        activeReleaseTypesArray.join("%7C"),
    });
  }, [activeReleaseTypesArray]);

  const fetchMoreMovies = () => {
    setLoading(true);
    setError(null);
    setUrlParams({
      ...urlParams,
      page: urlParams.page + 1,
    });
    setDiscoverUrl(generateUrl(urlParams));

    fetch(discoverUrl)
      .then((response) => response.json())
      .then((data) => {
        setMovies([...movies, ...data.results]);
        setTotalPages(data.total_pages);
        setHasMore(data.total_pages > urlParams.page);
        setLoading(false);
        setProgress(100);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const handleSearch = () => {
    const url = generateUrl(urlParams, showType);
    setDiscoverUrl(url);
  };

  const toggleFilter = (filter) => {
    if (activeGenresArray.includes(filter)) {
      setActiveGenresArray(activeGenresArray.filter((item) => item !== filter));
    } else {
      setActiveGenresArray([...activeGenresArray, filter]);
    }
  };

  const toggleCertification = (certification) => {
    if (activeCertificationsArray.includes(certification)) {
      setActiveCertificationsArray(
        activeCertificationsArray.filter((item) => item !== certification)
      );
    } else {
      setActiveCertificationsArray([
        ...activeCertificationsArray,
        certification,
      ]);
    }
  };

  const toggleOttProviders = (providerId) => {
    if (activeOttProviders.includes(providerId)) {
      setActiveOttProviders(
        activeOttProviders.filter((item) => item !== providerId)
      );
    } else {
      setActiveOttProviders([...activeOttProviders, providerId]);
    }
  };

  return (
    <>
      <section className="content container">
        <div className="media">
          <div className="column d-flex align-items-start w-100 justify-content-center align-content-start">
            <div className="content_wrapper d-flex align-items-start align-content-start flex-wrap">
              <div className="title row w-100">
                <h2 className="w-100 m-0 p-0 fw-bold">Popular Movies</h2>
              </div>
              <div className="content d-flex align-items-start w-100">
                <div className="filter-section">
                  <SortSectionAccordian
                    urlParams={urlParams}
                    setUrlParams={setUrlParams}
                    dropdownTitle={dropdownTitle}
                  ></SortSectionAccordian>
                  <FilterSectionAccordian
                    showType={showType}
                    urlParams={urlParams}
                    setUrlParams={setUrlParams}
                    genresList={genresList}
                    activeGenresArray={activeGenresArray}
                    CertificationList={CertificationList}
                    activeCertificationsArray={activeCertificationsArray}
                    countriesList={countriesList}
                    isAllAvailabilities={isAllAvailabilities}
                    toggleAllAvailabilities={toggleAllAvailabilities}
                    activeAvalabilitiesArray={activeAvalabilitiesArray}
                    toggleActiveAvalabilities={toggleActiveAvalabilities}
                    isAllReleases={isAllReleases}
                    toggleAllReleaseDates={toggleAllReleaseDates}
                    activeReleaseTypesArray={activeReleaseTypesArray}
                    toggleActiveReleases={toggleActiveReleases}
                    isAllCountries={isAllCountries}
                    languagesList={languagesList}
                    toggleAllCountries={toggleAllCountries}
                    toggleFilter={toggleFilter}
                    toggleCertification={toggleCertification}
                  ></FilterSectionAccordian>
                  <div className="filter-section_wrapper">
                    <Accordion
                      style={{
                        width: "100%",
                      }}
                    >
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Where To Watch</Accordion.Header>
                        <Accordion.Body className="ott-provider-filter">
                          <h3
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              width: "100%",
                              fontSize: "1em",
                              fontWeight: "300",
                              marginBottom: "10px",
                              color: "#000",
                            }}
                            className="filter-title p-0"
                          >
                            Country
                          </h3>
                          {ottRegionsList && (
                            <Form>
                              <Dropdown
                                onSelect={(eventKey) => {
                                  setUrlParams({
                                    ...urlParams,
                                    ott_region: eventKey,
                                  });
                                }}
                              >
                                <Dropdown.Toggle
                                  variant="secondary"
                                  id="dropdown-basic"
                                >
                                  <span>
                               
                                    {urlParams.ott_region
                                      ? ottRegionsList.find(
                                          (country) =>
                                            country.iso_3166_1 ===
                                            urlParams.ott_region
                                        ).native_name
                                      : "Select Country"}
                                  </span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  {ottRegionsList.map((country) => (
                                    <Dropdown.Item
                                      key={country.iso_3166_1}
                                      eventKey={country.iso_3166_1}
                                    >
                                     
                                      {country.native_name}
                                    </Dropdown.Item>
                                  ))}
                                </Dropdown.Menu>
                              </Dropdown>
                            </Form>
                          )}
                          <span className="ott_provider_wrapper">
                            <ul className="ott_providers">
                              {ottProvidersList &&
                                ottProvidersList.map((provider, index) => (
                                  <OverlayTrigger
                                    key={index}
                                    placement="top"
                                    overlay={
                                      <Tooltip id={`tooltip`}>
                                        {provider.provider_name}
                                      </Tooltip>
                                    }
                                  >
                                    <li
                                      key={provider.provider_id}
                                      onClick={() =>
                                        toggleOttProviders(provider.provider_id)
                                      }
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      data-original-title={
                                        provider.provider_name
                                      }
                                    >
                                      <span>
                                        <img
                                          src={`https://www.themoviedb.org/t/p/original${provider.logo_path}`}
                                          width="50"
                                          height="50"
                                          alt={provider.name}
                                        />
                                        <div
                                          className={
                                            activeOttProviders.includes(
                                              provider.provider_id
                                            )
                                              ? "ott_provider_checkbox_wrapper active"
                                              : "ott_provider_checkbox_wrapper"
                                          }
                                        >
                                          <span className="check-icon"></span>
                                        </div>
                                      </span>
                                    </li>
                                  </OverlayTrigger>
                                ))}
                            </ul>
                          </span>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                  <div className="search-btn" onClick={handleSearch}>
                    Search
                  </div>
                </div>
                <div className="movies-section">
                  <div className="wrapper">
                    <section className="pannel">
                      <div className="media_items">
                        {loading && (
                          <div className="loader">
                            <p>Loading...</p>
                          </div>
                        )}
                        {movies && (
                          <div
                            next={() => {
                              setProgress(50);
                              fetchMoreMovies();
                            }}
                            hasMore={hasMore}
                            loader={
                              <div className="loader">
                                <p>Loading...</p>
                              </div>
                            }
                          >
                            <div className="page_1">
                              {movies ? (
                                movies.map((movie, index) => (
                                  <FilterMovieCard
                                    key={index}
                                    id={movie.id}
                                    poster={movie.poster_path}
                                    title={movie.name ?? movie.title}
                                    date={
                                      movie.first_air_date ?? movie.release_date
                                    }
                                    rating={movie.vote_average * 10}
                                    showType={showType}
                                    movie={movie}
                                  />
                                ))
                              ) : (
                                <div>
                                  No items were found that match your query.
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {urlParams.page !== totalPages && !loading && (
                          <div className="load_more">
                            <Link
                              to=""
                              onClick={() => {
                                setHasMore(true);
                                fetchMoreMovies();
                                setProgress(50);
                              }}
                            >
                              Load More
                            </Link>
                          </div>
                        )}
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryPage;
