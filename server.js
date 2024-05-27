const http = require('node:http');
const os = require('os');

//Function to regt random numbers between 500 and 1500
function getRandomDelay() {
  return Math.floor(Math.random() * 1000) + 500;
}

//Function to handle CORS
function setCORSHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Set CORS headers
  setCORSHeaders(res);

  // Define Route for system info
  if (req.method === 'GET' && req.url === '/system-info') {
    // Simulate asynchronous operation with random delay
    setTimeout(() => {
      const cpuInfo = os.cpus();
      const osInfo = {
        platform: os.platform(),
        release: os.release(),
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
      };

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ cpuInfo, osInfo }));
    }, getRandomDelay());
  } else {
    // Handle other routes with a random delay and a simple message
    setTimeout(() => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello! This is a response with a random delay.');
    }, getRandomDelay());
  }
});

server.listen(3000,`127.0.0.1`, () => {
  console.log(`Server is running`);
});
