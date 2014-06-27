'use strict';

var cfg = {
        hosts: [
            {
                host: 'localhost',
                port: '8080'
            }
        ],
        paths: [
            '/foo'
        ],
        requests: 10000
    };

module.exports = function config() {
    return cfg;
};