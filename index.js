const backend = require('monolith-backend');

const server = backend.Server.create();
const port = process.env.PORT || 5000;

server.open(port);
server.serveStaticFiles('/', 'public');
