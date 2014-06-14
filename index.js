var Http = require('http-utility'),
    host = 'localhost',
    options = {
        host: host,
        port: '8080'
    },
    report = {
        host: host,
        pass: 0,
        fail: 0,
        completed: 0,
        ongoing: 0,
        total: 500,
        pending: 500,
        start: new Date(),
        success: {
            200: 0
        },
        errors: {}
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
        report.errors[code]++;
    } else {
        report.errors[code] = {
            code: 1
        };
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

        if (error) {
            handleError(error);
        } else {
            success();
        }
    });
}


getData();
