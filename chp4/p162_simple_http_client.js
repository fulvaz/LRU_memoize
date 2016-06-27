import http from 'http'

let option = {
    hostname: '127.0.0.1',
    port: 1337,
    path: '/',
    method: 'GET'
};

let req = http.request(option, (res) => {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');

    res.on('data', (chunk) => {
        console.log(chunk);
    });
});

req.end();