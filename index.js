const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const networkInterfaces = require('os').networkInterfaces;

const { Server } = require("socket.io");
const io = new Server(server);


const getLocalExternalIP = () => [].concat(...Object.values(networkInterfaces()))
  .find((details) => details.family === 'IPv4' && !details.internal)
  .address



class SocketVariable {
	value;
	name;
	constructor(name, value) {
		this.name = name;
		this.value = value;
	}

	set(value) {
		io.emit(this.name, value);
		this.value = value;
	}
	get() {
		return this.value;
	}
}

let history = [];
history.push({msg:"Welcome to the chatroom! Check out how many people are online in the upper right corner.", name:"SocketChat"});

let online = new SocketVariable('online', 0);

io.on('connection', (socket) => {
  console.log('a user connected');
	io.emit('history', history);

	online.set( online.get() + 1);

	socket.on('chat message', msg => {
		console.log(msg);
		history.push(msg);
    io.emit('chat message', msg);
  });

	socket.on('disconnect', e => {
		console.log("disconnect");
		online.set(online.get() - 1);
	})
});


app.get('/', (req, res) => {
	res.sendFile(__dirname + '/static/index.html');
});

app.use(express.static('static'))

server.listen(80, () => {
	console.log('listening on *:3000');
	console.log("Listening on: " + getLocalExternalIP() + ":80");
});



