const redis = require('redis');

const client = redis.createClient({
    host: 'localhost', 
    port: 6379
});

client.connect()

client.on('error', err => {
    console.error('Redis error:', err);
});

process.on('exit', () => {
    client.quit();
});

module.exports = client;
