const router = require("express").Router();
const ArticlesController = require("../../controllers/article-controller");

// Matches with "/api/articles"
router.route("/")
  .get(ArticlesController.findAll)
  .post(ArticlesController.create);

// Matches with "/api/articles/:id"
router
  .route("/:id")
  .get(ArticlesController.findById)
  .put(ArticlesController.update)
  .delete(ArticlesController.remove);

module.exports = router;