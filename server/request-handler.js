/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var fs = require('fs');
var express = require('express');

var messages = fs.createWriteStream('messages.txt', {flags: 'a'});
var arr = (fs.readFileSync('messages.txt') + '').split('\n');
var body = arr.slice(0, arr.length - 1).map(val => JSON.parse(val)).reverse() || [];


var handleGet = (req, res) => {
  res.end(JSON.stringify({results: body}));
};
  
var handlePost = (req, res) => {
  let message = req.body;
  message.objectId = body.length + 1;
  message.createdAt = new Date();
  body.unshift(message);
  messages.write(JSON.stringify(message) + '\n');

  res.sendStatus(201);
  res.send();
};

var handlePut = (req, res) => {
  let message = req.body;
  for (let i = 0; i < body.length; i++) {
    if (body[i].objectId === message.objectId) {
      body[i] = message;
      // TODO: change in file also
      break;
    }
  }

  res.end();
};

var handleDelete = (req, res) => {
  let message = req.body;
  for (let i = 0; i < body.length; i++) {
    if (body[i].objectId === message.objectId) {
      body.splice(i, 1);
      // TODO: delete in file also
      break;
    }
  }

  res.end();
};

module.exports = {
  handleGet,
  handlePost,
  handlePut,
  handleDelete
};

