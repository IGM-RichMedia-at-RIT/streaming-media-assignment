const fs = require('fs');
// const {
//   request,
// } = require('http');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const client2 = fs.readFileSync(`${__dirname}/../client/client2.html`);
const client3 = fs.readFileSync(`${__dirname}/../client/client3.html`);

const getIndex = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/html',
  });
  response.write(index);
  response.end();
};

const getClient2 = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/html',
  });
  response.write(client2);
  response.end();
};

const getClient3 = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/html',
  });
  response.write(client3);
  response.end();
};

module.exports.getIndex = getIndex;
module.exports.getClient2 = getClient2;
module.exports.getClient3 = getClient3;
