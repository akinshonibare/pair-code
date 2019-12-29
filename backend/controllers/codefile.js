'use strict';
const fs = require("fs");

module.exports = {
    uploadedCode: function(req, res, next) {
        const file = req.file; // file passed from client
        console.log(file);

        fs.readFile(file.path, function(err, buf) {
            let value = buf.toString()
            console.log(value);
            return res.status(200).send({ result: value});
        });
  },
};