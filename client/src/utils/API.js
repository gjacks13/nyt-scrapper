import axios from "axios";

export default {
  // Gets all articles
  getArticles: function(savedOnly, startYear, endYear) {
    let route = "/api/articles";
    let queryString = "";
    if (startYear) {
      queryString += `startYear=${startYear}&`;
    }
    if (endYear) {
      queryString += `endYear=${endYear}&`;
    }
    if (savedOnly) {
      queryString += `savedOnly=${savedOnly}&`;
    }

    if (queryString) {
      // remove trailing ampersand
      queryString = queryString.substring(0, queryString.length - 1);
    }

    return axios.get(`/api/articles?${queryString}`);
  },

  updateArticle: function(id, articleData) {
    return axios.post("/api/articles/" + id, articleData);
  },

  scrapeArticles: function(startYear, endYear) {
    if (startYear && endYear) {
      return axios.get(`/api/scraper?startYear=${startYear}&endYear=${endYear}`);
    } else if (startYear) {
      return axios.get(`/api/scraper?startYear=${startYear}`);
    } else if (endYear) {
      return axios.get(`/api/scraper?endYear=${endYear}`);
    } else {
      return axios.get(`/api/scraper`);
    }
  },
};