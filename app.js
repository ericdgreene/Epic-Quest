const express = require('express');
const app = express();
const serv = require('http').Server(app);
const port = 4000;

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

app.use('client', express.static(__dirname + '/client'));

if (serv.listen(port)) {
  console.log(`Server started on port ${port}`);
} else {
  console.error(error);
}

var io = require('socket.io')(serv, {});

io.sockets.on('connection', function (socket) {
  console.log('socket connection');

  socket.on('message', function (data) {
    console.log('message received: ' + data.game);
  });

  socket.on('msg', function (data) {
    console.log('button clicked by: ' + data.name);
  });

  socket.emit('serverMsg', {
    msg: 'From Server'
  });
});