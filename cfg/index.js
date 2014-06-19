'use strict';

var cfg = {
        hosts: [
            {
                host: 'localhost',
                port: '8080'
            }
        ],
        paths: [
            '/foo',
            '/bar'
        ],
        port: '8080',
        requests: 50
    };

module.exports = function config() {
    return cfg;
};