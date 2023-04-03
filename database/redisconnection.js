const redis = require("redis");

const redisClient = redis.createClient({
  host: process.env.HOST,
  port: process.env.PORT,
  idleTimeoutMillis: 30000
});
redisClient.connect()
redisClient.on("error", function(err) {
  console.error("Error connecting to Redis server:", err);
});

module.exports = redisClient
