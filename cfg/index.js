'use strict';

var cfg = {
        hosts: [
            {
                host: 'localhost',
                port: '8080'
            }
        ],
        paths: [
            '/bix'
        ],
        requests: 1000
    };

module.exports = function config() {
    return cfg;
};