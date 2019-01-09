const http = require('http');


const port = process.env.PORT || 3000;
const server = http.createServer((req, res) => console.log(`server running at ${port}`));
server.listen(port)
