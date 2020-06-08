const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
io.on('connection', (client) => {
    console.log('user connected: ',client.request._query['username']);
    io.emit('mes', {message:`${client.request._query['username']} has joined.`});
    client.on('disconnect',()=>{
        io.emit('mes', {message:`${client.request._query['username']} has left.`});
    });
});

app.post('/message', (req, res) => {
      io.emit('mes', req.body);
      res.sendStatus(200);
});

server.listen(PORT,(err)=>{
    if(err)
        console.log(err);
    else
        console.log('Server started in PORT: '+PORT);
});