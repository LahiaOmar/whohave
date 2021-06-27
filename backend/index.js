const server = require('./app');

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`app listen on port ${PORT} ...`))
