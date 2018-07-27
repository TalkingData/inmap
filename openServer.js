const open = require('opn');
let httpServer = require('http-server');


let server = httpServer.createServer({
    root: './',
    robots: true,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
    }
});

server.listen(8088);

let url = 'http://localhost:8088/examples/index.html';

console.log('open ', url);

open(url, {}).catch(() => {
    console.log('If you are running in a headless environment, please do not use the open flag.');
});