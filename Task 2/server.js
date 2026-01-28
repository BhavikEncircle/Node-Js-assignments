const http = require("http");
const fs = require("fs");
const path = require("path");
const server = http.createServer((req, res) => {
  let filepath = "";

  if (req.url === "/") {
    filepath = path.join(__dirname, "public", "index.html");
  } else if (req.url === "/about") {
    filepath = path.join(__dirname, "public", "about.html");
  } else {
    filepath = path.join(__dirname, "public", "index.html");
  }

  fs.readFile(filepath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end("File not found");
    } else {
      res.writeHead(200);
      res.end(content);
    }
  });
});

server.listen(3000);
