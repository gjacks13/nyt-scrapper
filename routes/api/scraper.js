const router = require("express").Router();
const axios = require("axios");
const cheerio = require("cheerio");
const scrapedArticlesController = require("../../controllers/scraped-article-controller");

// Matches with "/api/scraper"
router.get('/', function(req, res) {
  scrapedArticlesController.scrapeArticles(req, res);
});

module.exports = router;