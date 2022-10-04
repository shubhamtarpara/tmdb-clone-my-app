import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./searchbackground.css";

const SearchBackground = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleOnChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    navigate(`/search/movie?query=${searchQuery}`);
  }

  return (
    <div className="container background">
      <section className="main-container">
        <div className="content_wrapper">
          <div className="title">
            <h2>Welcome.</h2>
            <h3>
              Millions of movies, TV shows and people to discover. Explore now.
            </h3>
          </div>

          <div className="search">
            <form id="inner_search_form" onSubmit={handleSearch}>
              <input
                className="search_input "
                name="query"
                type="text"
                placeholder="Search for a movie, tv show, person......"
                onChange={handleOnChange}
                value={searchQuery}
              />
              <input type="submit" value="Search" className="submit_input" />
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchBackground;
