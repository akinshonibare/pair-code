require("dotenv").config();

const config = {
  // development API keys
  development: {
    PORT: process.env.PORT_DEV,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASS: process.env.MONGO_PASS,
    MONGO_URL: process.env.MONGO_URL,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_API_KEY: process.env.TWILIO_API_KEY,
    TWILIO_API_SECRET: process.env.TWILIO_API_SECRET
  },

  // production API keys
  production: {
    PORT: process.env.PORT_PROD,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASS: process.env.MONGO_PASS,
    MONGO_URL: process.env.MONGO_URL,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_API_KEY: process.env.TWILIO_API_KEY,
    TWILIO_API_SECRET: process.env.TWILIO_API_SECRET
  },

  // test API keys
  test: {}
};

// export config based on environment
module.exports = config[process.env.NODE_ENV];
