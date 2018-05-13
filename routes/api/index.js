const router = require("express").Router();
const articleRoutes = require("./articles");
const scraperRoutes = require("./scraper");

// article routes
router.use("/articles", articleRoutes);
router.use("/scraper", scraperRoutes);

module.exports = router;