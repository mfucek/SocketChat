import {getName} from './names.js';

var socket = io();
console.log(socket);

var messages = document.getElementById('messages');
var online = document.getElementById('online');
var form = document.getElementById('form');
var input = document.getElementById('input');
var nameInput = document.getElementById('name');
var btn = document.getElementById('btn');

nameInput.value = getName();

const sendMsg = () => {
	if (input.value) {
		socket.emit('chat message', {msg:input.value, name:nameInput.value});
		input.value = '';
		setTimeout(() => {
			input.value ='';
		}, 50)
	}
}

document.addEventListener('keydown', (e) => {
	if (e.key == "Enter" && !e.shiftKey) {
		e.preventDefault();
		sendMsg();
	}
});

btn.addEventListener('click', function(e) {
	e.preventDefault();
	sendMsg();
});


socket.on('online', function(msg) {
	online.textContent = msg + " people";
});

let lastMsg;
const parseMsg = (msg) => {
	var item = document.createElement('li');

	var name = document.createElement('span');
	name.id = "nick"

	name.textContent = lastMsg?.name == msg.name ? '' : msg.name;
	item.appendChild(name);

	var message = document.createElement('span');
	message.id = "message"
	
	let a = JSON.stringify(msg.msg)
	a = a.slice(1,-1)
	a = a.replace(/\\n/g, '<br />');
	a = a.replace(/\\t/g, '&emsp;');

	message.innerHTML = a

	item.appendChild(message);

	messages.appendChild(item);
	lastMsg = msg;
}


socket.on('history', function(msg) {
	messages.innerHTML = "";
	msg.forEach(e => {
		parseMsg(e);
	})
});

socket.on('chat message', function(msg) {
	parseMsg(msg);
	window.scrollTo(0, document.body.scrollHeight);
});


Array.from( document.querySelectorAll('[data-expand]'), (input)=>{
  let parent = input.parentNode;
  function updateSize(){
    parent.dataset.value = input.value
  }
  input.addEventListener('input', updateSize);
  updateSize();
});

console.log(input);
input.addEventListener('input', (e) => {
	input.rows = input.value.split('\n').length;
})