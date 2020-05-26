import redis from 'redis';
import asyncRedis from 'async-redis';
import dotenv from 'dotenv';
import _ from "lodash";

dotenv.config(); // this is important!

const port_redis = process.env.REDIS_PORT || 6379;

const redisClient = redis.createClient(port_redis);
const asyncRedisClient = asyncRedis.decorate(redisClient);

asyncRedisClient.on('connect', function () {
    console.log('Redis client connected');
});
asyncRedisClient.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

export default asyncRedisClient;