'use strict';
const {PythonShell} = require('python-shell');

module.exports = {
  runPython: function(req, res, next) {
    PythonShell.runString(req.body.code, null, function (err, results) {
      if (err) {
        return res.status(200).send({ result: err.stack});       
      }else{
        return res.status(200).send({ result: results[0]});       
      }
    });
  },
};