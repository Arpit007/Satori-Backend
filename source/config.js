/**
 * Created by Home Laptop on 06-Oct-17.
 */
const mongoose = require('mongoose');
const Promise = require('bluebird');
const MemCached = require('memcached');
const Codes = require('./error');

mongoose.Promise = Promise;

const Config = {
    MongoUrl :  process.env.MONGODB_URI || "mongodb://localhost:27017/Satori",
    MemCachedUrl : process.env.MEMCACHED_URI || 'localhost:11211',
    port : 3000
};

mongoose.connect(Config.MongoUrl, function (err) {
    if (err)
        console.log(err);
    else console.log('Connected Successfully');
});

global.memCached = new MemCached(Config.MemCachedUrl, {
    retries : 10, maxExpiration : maxConcurrentSessionDuration, retry : 10000,
    remove : true, timeout : 5000, reconnect : 30000
});

global.Config = Config;
module.exports = Config;