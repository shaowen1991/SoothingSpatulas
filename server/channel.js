var socketio = require('socket.io');
var http = require('http')
var app = require('./app');
var server = http.Server(app);
var websocket = socketio(server);
server.listen(8000, () => console.log('socket listening on *:8000'));
const models = require('../db/models');

// Mapping objects to easily map sockets and users.
var users = {};

websocket.on('connection', (socket) => {//connection not custom event
  console.log("websocket connection")
  socket.on('userJoined', (user) => onUserJoined(user, socket));//now that you have userid stor it in clients map
  socket.on('message', (message) => onMessageReceived(message, socket));
});

// Event listeners.
// When a user joins the channel.
function onUserJoined(user, socket) {

  try {
        users[user.userId] = {socket: socket, toUser: user.toId}
        console.log("userJoined", user);
        _sendExistingMessages(socket, user.toId, user.userId);

  } catch(err) {
    console.error(err);
  }
}

// When a user sends a message in the channel.
function onMessageReceived(message, senderSocket) {
  var userId = message.user._id;
  // Safety check.
  if (!userId) return;
  _sendAndSaveMessage(message, senderSocket);
}

// Helper functions.
// Send the pre-existing messages to the user that just joined.
function _sendExistingMessages(socket, toId, fromId) {
  models.Channel
  .forge()
  .query(function(qb) {
    qb.where({'from_id':fromId, 'to_id': toId}).orWhere({'from_id':toId, 'to_id': fromId})
  })
  .orderBy('created_at', 'DESC')
  .fetchAll()
  .then(function(messages){
    socket.emit('message', messages);
  })
}

// Save the message to the db and send all sockets but the sender.
function _sendAndSaveMessage(message, socket) {
  var messageData = {
    text: message.text,
    user: message.user,
    createdAt: new Date(message.createdAt)
  };
  models.Channel
  .forge({'from_id':message.user._id,'to_id':users[message.user._id].toUser, 'message': messageData.text})
  .save()
  .then(function(data){
    console.log('Channel data inserted into database');
    var emitter = socket.broadcast;
    emitter.emit(‘message’, [message]);
  })
  .catch(function(err){
    console.log(err);
  })
}

module.exports = websocket;