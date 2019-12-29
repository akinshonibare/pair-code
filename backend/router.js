'use strict';
const path = require("path");
const express = require('express');

const codeRoutes = require('./routes/code');
const snippetsRoutes = require('./routes/snippets');
const twilioRoutes = require('./routes/twilio');
const codefileRoutes = require('./routes/codefile');
const errorMiddleware = require('./errors/middleware');


module.exports = function(app) {
  // mount api routes on to api router
  const apiRouter = express.Router();
  apiRouter.use('/code', codeRoutes);
  apiRouter.use('/twilio', twilioRoutes);
  apiRouter.use('/snippets', snippetsRoutes);
  apiRouter.use('/codefile', codefileRoutes);
  // mount api router on to app
  app.use('/api', apiRouter);
  // mount middleware to handle errors
  app.use(errorMiddleware)
  // mount catch all route
  if(process.env.NODE_ENV === 'development'){
    app.all("*", (req, res) => res.status(200).send("PAIR CODE SERVER API"));
  }else{
    app.use(express.static(path.join(__dirname, "/build")));
    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname+'/build/index.html'));
    });
  }
};