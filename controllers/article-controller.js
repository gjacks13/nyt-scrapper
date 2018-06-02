const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    let filter= {};
    if (req.query.startdate) {
      filter.publish_date = {
        $gte: req.query.startdate
      }
    }
    if (req.query.enddate) {
      filter.publish_date = {
        $gte: req.query.enddate
      }
    }
    if (req.query.startdate && req.query.enddate) {
      filter.publish_date = {
        $gte: req.query.enddate,
        $lte: req.query.end
      }
    }
    if (req.query.savedOnly && parseInt(req.query.savedOnly)) {
      filter.save_date = { $exists: true };
    }
    db.Article
      .find(filter)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Article
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Article
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Article
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Article
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};