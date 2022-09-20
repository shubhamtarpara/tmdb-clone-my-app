import axios from "axios";

export const dataApi = (isMovie, type, page) => {
  const categoryURL = `https://api.themoviedb.org/3/${isMovie}/${type}?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`;
  return axios.get(categoryURL);
};

export const rentDataApi = (isMovie, page) => {
  const rentUrl = `https://api.themoviedb.org/3/discover/${isMovie}?api_key=${process.env.REACT_APP_API_KEY}&watch_region=US&with_watch_monetization_types=rent&page=${page}`;
  return axios.get(rentUrl);
};

export const theatresDataApi = (isMovie) => {
  const theatresUrl = `https://api.themoviedb.org/3/discover/${isMovie}?api_key=${process.env.REACT_APP_API_KEY}&region=US&with_release_type=3|2`;
  return axios.get(theatresUrl);
};

export const freeToWatchMovieApi = (isMovie) => {
  const freeToWatchMovieUrl = `https://api.themoviedb.org/3/discover/${isMovie}?api_key=${process.env.REACT_APP_API_KEY}&with_watch_monetization_types=free`;
  return axios.get(freeToWatchMovieUrl);
};

export const trendingApi = (isMovie, time) => {
  const trendingUrl = `https://api.themoviedb.org/3/trending/${isMovie}/${time}?api_key=${process.env.REACT_APP_API_KEY}`;
  return axios.get(trendingUrl);
};
export const GetDetails = (isMovie, id) => {
  const detailURL = `https://api.themoviedb.org/3/${isMovie}/${id}?api_key=${process.env.REACT_APP_API_KEY}`;
  return axios.get(detailURL);
};
export const GetCredit = (isMovie, id) => {
  const creditURL = `https://api.themoviedb.org/3/${isMovie}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
  return axios.get(creditURL);
};
export const GetReview = (isMovie, id) => {
  const reviewURL = `https://api.themoviedb.org/3/${isMovie}/${id}/reviews?api_key=${process.env.REACT_APP_API_KEY}`;
  return axios.get(reviewURL);
};

export const GetVideo = (isMovie, id) => {
  const videoURL = `https://api.themoviedb.org/3/${isMovie}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`;
  return axios.get(videoURL);
};

export const GetImage = (isMovie, id) => {
  const imageURL = `https://api.themoviedb.org/3/${isMovie}/${id}/images?api_key=${process.env.REACT_APP_API_KEY}`;
  return axios.get(imageURL);
};

export const GetRecommendation = (isMovie, id) => {
  const recommendationURL = `https://api.themoviedb.org/3/${isMovie}/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}`;
  return axios.get(recommendationURL);
};

export const GetExternalIDs = (isMovie, id) => {
  const externalIdURL = `https://api.themoviedb.org/3/${isMovie}/${id}/external_ids?api_key=${process.env.REACT_APP_API_KEY}`;
  return axios.get(externalIdURL);
};

export const GetKeywords = (isMovie, id) => {
  const keywordsURL = `https://api.themoviedb.org/3/${isMovie}/${id}/keywords?api_key=${process.env.REACT_APP_API_KEY}`;
  return axios.get(keywordsURL);
};

export const GetWatchProvider = (isMovie, id) => {
  const watchProviderURL = `https://api.themoviedb.org/3/${isMovie}/${id}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}`;
  return axios.get(watchProviderURL);
};

export const GetSearchData = (currentData, query, page) => {
  const searchQueryUrl = `https://api.themoviedb.org/3/search/${currentData}?api_key=${process.env.REACT_APP_API_KEY}&query=${query}&page=${page}`;
  return axios.get(searchQueryUrl);
};
