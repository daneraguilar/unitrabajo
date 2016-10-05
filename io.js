var io = require('socket.io')();

io.on('connection', function (socket) {
  console.log("connected");
  socket.emit('news', { hello: 'world' });
});
module.exports = io;