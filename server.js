const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 3000;
let requestCount = 0;

const server = http.createServer((req, res) => {
  requestCount++;

  if (req.url === '/' || req.url === '/index.html') {
    fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    });
  } else if (req.url === '/api/telemetry') {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMemPercent = Math.round(((totalMem - freeMem) / totalMem) * 100);

    const payload = {
      status: 'HEALTHY',
      containerId: os.hostname(),
      architecture: `${os.platform()} (${os.arch()})`,
      uptime: Math.floor(process.uptime()),
      memoryUsage: usedMemPercent,
      totalRequests: requestCount,
      serverTime: new Date().toLocaleTimeString()
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(payload));
  } else if (req.url === '/api/ping') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ pong: true, timestamp: Date.now() }));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 - Not Found');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Cloud Command Center running at http://localhost:${PORT}/`);
});

