var Http = require('http-utility'),
    host = 'localhost',
    path = '',
    requests = 50,
    options = {
        host: host,
        port: '8080',
        path: path
    },
    report = {
        host: host,
        path: path,
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
    },
    request,
    status;

function success() {
    report.success[200]++;

    report.pass++;
    completed();
}

function handleError(failure) {
    var code = failure.error.statusCode;
    
    if (report.errors[code]) {
        report.errors[code].amount++;
    } else {
        report.errors[code] = failure.error;
        report.errors[code].amount = 1;
    }

    report.fail++;
    completed();
}

function displayReport() {
    console.log('Report data - %j',report);
}

function completed() {
    report.completed++;
    if (report.pending === 0) {
        displayReport();
        return;
    }

    report.ongoing--;
    getData();

    report.end = new Date();

}

function getData() {
    Http.get(options, function callback(error, data) {
        report.pending--;
        report.ongoing++;
        report.start = new Date();

        if (error) {
            handleError(error);
        } else {
            success();
        }
    });
}


getData();
