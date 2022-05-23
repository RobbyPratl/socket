const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io")
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
io.on('connection', (socket) => {
    io.emit("chat message","new connection")
    socket.on('chat message', (msg,name) => {
      console.log(name+": "+msg)
      io.emit('chat message',name+": "+ msg)
    });
    socket.on("pm",(from,to,msg) =>{
        io.emit("pm",msg)
    })
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});