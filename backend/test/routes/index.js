const server = require('../../app')

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`app listen on port ${PORT} ...`))

module.exports = server