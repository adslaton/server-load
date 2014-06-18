'use strict';

var Http = require('http-utility'),
    async = require('async'),
    cfg = require('./cfg')(),
    status;

function setOptions() {
    var options = {};

    return options;
}

function success(report, options) {
    report.success[200]++;

    report.pass++;
    completed(report, options);
}

function handleError(failure, report, options) {
    failure.error = failure.error || new Error();

    var code = failure.error.statusCode;
    
    if (report.errors[code]) {
        report.errors[code].amount++;
    } else {
        report.errors[code] = failure.error;
        report.errors[code].amount = 1;
    }

    report.fail++;
    completed(report, options);
}

function displayReport(report) {
    console.log('Report data - %j', report);
}

function completed(report, options) {
    report.completed++;
    if (report.pending === 0) {
        displayReport(report);
        return;
    }

    report.ongoing--;
    getData(report, options);

    report.end = new Date();

}

function getData(report, options) {
    Http.get(options, function callback(error, data) {
        report.pending--;
        report.ongoing++;
        report.start = new Date();

        if (error) {
            handleError(error, report, options);
        } else {
            success(report, options);
        }
    });
}

function startRequest(position) {
    var options = {},
        hosts = cfg.hosts,
        paths = cfg.paths,
        requests = cfg.requests,
        report,
        i,
        j;

    /* Set the http options for each host */
    for (i = 0; i < hosts.length; i++) {
        options.host = hosts[i].host;
        options.port = hosts[i].port;
        
        /* get data for each path */
        for (j = 0; j < paths.length; j++) {
            options.path = paths[j];
            report = {
                position: position,
                host: options.host,
                path: options.path,
                pass: 0,
                fail: 0,
                completed: 0,
                ongoing: -1,
                total: requests,
                pending: requests,
                success: {
                    200: 0
                },
                errors: {},
                start: new Date()
            }
            getData(report, options);
        }
    }
}

function parallelHandler(error, results) {
    if (error) {
        log.log('Error while running parallel: %j', error);
    }
    log.log('parallel completed');
}

/* Use async.parallel to make multiple requests */
async.parallel([
    startRequest(1),
    startRequest(2)
], parallelHandler);