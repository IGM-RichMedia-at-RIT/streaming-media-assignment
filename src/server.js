const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const mediaHandler = require('./mediaResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
    console.log(request.url);
    switch (request.url) {
        case '/':
            htmlHandler.getIndex(request, response);
            break;
        default:
            htmlHandler.getIndex(request, response);
            break;
    }
}