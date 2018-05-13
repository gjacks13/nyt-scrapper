const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: { type: String, required: true, unique : true, dropDups: true },
  author: { type: String, required: true },
  publish_date: { type: Date, required: true },
  save_date: { type: Date },
  url: { type: String, required: true, unique : true, dropDups: true }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;