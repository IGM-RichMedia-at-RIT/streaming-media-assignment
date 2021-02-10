const fs = require('fs');
const path = require('path');

const loadFile = (request, response, filePath, fileType) => {
  const file = path.resolve(__dirname, filePath);
  fs.stat(file, (err, stats) => {
    // handle a potential error
    if (err) {
      if (err.code === 'ENOENT') {
        response.writeHead(404);
      }
      // send the error back to the client
      return response.end(err);
    }

    // check for a range header
    let { range } = request.headers;

    // if there is no range header, assume to begin at the beginning of the file
    if (!range) {
      range = 'bytes=0-';
    }

    // parse the range header, which is formatted as 'bytes=XXXX-YYYY', into an array
    // XXXX is the starting range, YYYY is the ending range
    const positions = range.replace(/bytes=/, '').split('-');

    // converts the starting range into an integer with base of 10
    let start = parseInt(positions[0], 10);

    // gives the total file size in bytes
    const total = stats.size;
    // if the ending range was provided, save it as an integer
    // otherwise set it to be the total minus one
    const end = positions[1] ? parseInt(positions[1], 10) : total - 1;

    // reset the start range if it exceeds the end range
    if (start > end) {
      start = end - 1;
    }

    const chunksize = (end - start) + 1;

    // let the client know a few things about the data we are sending over
    response.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${total}`, // how much of the total we are sending, formatted as 'bytes start-end/total'
      'Accept-Ranges': 'bytes', // what type of data
      'Content-Length': chunksize, // how big the chunk is in bytes
      'Content-Type': fileType, // encoding type
    });

    // creates a stream with the file and designated start and end points
    const stream = fs.createReadStream(file, { start, end });

    // callback functions for the various states of the stream
    stream.on('open', () => {
      stream.pipe(response);
    });

    stream.on('error', (streamErr) => {
      response.end(streamErr);
    });

    return stream;
  });
};

const getParty = (request, response) => {
  loadFile(request, response, '../client/party.mp4', 'video/mp4');
};

const getBling = (request, response) => {
  loadFile(request, response, '../client/bling.mp3', 'audio/mpeg');
};

const getBird = (request, response) => {
  loadFile(request, response, '../client/bird.mp4', 'video/mp4');
};

module.exports.getParty = getParty;
module.exports.getBling = getBling;
module.exports.getBird = getBird;
