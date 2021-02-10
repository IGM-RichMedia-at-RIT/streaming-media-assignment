const fs = require('fs');

const loadPage = (request, response, filePath) => {
  const page = fs.readFileSync(`${__dirname}/${filePath}`);
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(page);
  response.end();
};

const getClient = (request, response) => {
  loadPage(request, response, '../client/client.html');
};

const getClient2 = (request, response) => {
  loadPage(request, response, '../client/client2.html');
};

const getClient3 = (request, response) => {
  loadPage(request, response, '../client/client3.html');
};

module.exports.getClient = getClient;
module.exports.getClient2 = getClient2;
module.exports.getClient3 = getClient3;
