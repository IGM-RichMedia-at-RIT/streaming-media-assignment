const fs = require('fs');
const {
    request
} = require('http');
const index = fs.readFileSync(`${__dirname}/../client/client.html`);

const getIndex = (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    response.write(index);
    response.end();
}

module.exports.getIndex = getIndex;