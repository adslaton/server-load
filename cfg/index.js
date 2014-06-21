'use strict';

var cfg = {
        hosts: [
            {
                host: 'localhost',
                port: '8080'
            }
        ],
        paths: [
            '/',
            '/fiz'
        ],
        port: '8080',
        requests: 5
    };

module.exports = function config() {
    return cfg;
};