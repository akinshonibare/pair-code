'use strict';
const Snippets = require("../models/Snippets");

module.exports = {
  getSnippets: function(req, res, next) {
    Snippets.find({})
    .exec()
    .then(results => {
      let index = Math.floor(Math.random() * 95)
      return res.status(200).send({result: results[index]}); 
    })
  },
};