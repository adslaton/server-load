var Http = require('http-utility'),
    host = 'localhost.cnn.com',
    path = '',
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
        ongoing: 0,
        total: 500,
        pending: 500,
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

function handleError(error) {
    var code = error.statusCode;

    if (report.errors[code]) {
        report.errors[code].amount++;
    } else {
        report.errors[code] = error;
        report.errors[code].amount = 1;
    }

    report.fail++;
    completed();
}

function completed() {
    if (report.pending <= -1) {
        return;
    }

    report.ongoing--;
    report.completed++;
    getData();

    report.end = new Date();

    console.log(report);

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
