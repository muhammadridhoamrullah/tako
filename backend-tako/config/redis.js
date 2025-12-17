const Redis = require("ioredis");

const redis = new Redis({
  host: process.env.HOST_REDIS,
  port: process.env.PORT_REDIS,
  password: process.env.PASSWORD_REDIS,
});
module.exports = redis;
