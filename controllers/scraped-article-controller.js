const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

const NYT_URL = "https://www.nytimes.com/";
const scrapeArticles = res => {
  let articlesArray = [];
  // First, we grab the body of the html with request
  axios.get(NYT_URL).then(function(response) {
    const $ = cheerio.load(response.data);

    const body = $("body");
    let cols = body.children("#shell")
      .children("#page")
      .children("main")
      .children(".layout")
      .children(".ab-column")
      .children("#top-news")
      .children(".layout")
      .children(".a-column")
      .children(".region")
      .children(".collection");
    
    // Now, we grab every article tag, and do the following:
    cols.each(function(i, element) {
      let article = $(this)
        .children("article");

      if (article.length) {
        let storyHeadingLink = article.children(".story-heading").children("a");
        let byLine = article.children(".byline");

        const title = storyHeadingLink.text();

        const url = storyHeadingLink
          .attr("href");

        let author = byLine
          .text();
        const authorRegex = `^By\\s([a-zA-Z_\\s\\.\\,]+)\\d*.*$`;
        const rgxObj= new RegExp(authorRegex);
        let match = rgxObj.exec(author);
        author = match[1].trim();

        const publishDate = byLine
          .children("time")
          .attr("datetime");

        // Save an empty result object
        const result = {};
  
        // Add the text and href of every link, and save them as properties of the result object
        result.title = title;
        result.author = author;
        result.publish_date = new Date(publishDate);
        result.url = url;
        console.log(result);

        // push onto articles array
        articlesArray.push(result);

        db.Article.create(result)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(err) {
          return res.json(err);
        });
      }
    });
      
    //res.json(articlesArray);
    res.send("Scrape Complete");
  });
};

// Defining methods for the scrapedArticleController
module.exports = {
  scrapeArticles: function(req, res) {
    scrapeArticles(res);
  }
};