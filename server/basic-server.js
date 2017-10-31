/* Import node's http module: */
var http = require('http');
var handler = require('./request-handler');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

/* === Initial Configuration === */

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  return next();
});
app.use(express.static('client'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());

/* ============================ */

app.get('/classes/messages', handler.handleGet);
app.post('/classes/messages', handler.handlePost);
app.put('/classes/messages', handler.handlePut);
app.delete('/classes/messages', handler.handleDelete);

app.listen(3000);

