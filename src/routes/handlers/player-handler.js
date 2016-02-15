'use strict';
var mongoose = require('mongoose');
var Player = require('../.././models/model-playerinfo');
var player_handler = {};
mongoose.Promise = Promise;

player_handler.getAll = function(request, response) {
  Player.find({}).sort({ name: 'asc' })
    .then(function (players) {
      response.json(players);
    })
    .catch(function (error) {
      response.send(error);
    });
  };

player_handler.getPlayerByName = function(request, response) {
  var playerName = request.params.playerName.toUpperCase();
  Player.findOne({ name: playerName } )
    .then(function (player) {
      response.json(player);
    })
    .catch(function (error) {
      response.send(error);
    });
};

player_handler.createPlayer = function(request, response) {
  var newPlayer = new Player();
  newPlayer.name = request.body.name;
  newPlayer.team = request.body.team;
  newPlayer.age = request.body.age;
  newPlayer.position = request.body.position;
  newPlayer.rookie = request.body.rookie;
  newPlayer.yearsInTheLeauge = request.body.yearsInTheLeauge;
  newPlayer.save()
    .then(function(player){
      response.json(player);
    })
    .catch(function(error){
      response.send(error);
    });
};

player_handler.updatePlayerInfo = function(request, response) {
  if(request.body.name) {
    request.body.name = request.body.name.toUpperCase();
  } else if (request.body.team) {
    request.body.team = request.body.team.toUpperCase();
  } else if (request.body.position) {
    request.body.position = request.body.position.toUpperCase();
  }
  Player.findByIdAndUpdate(request.params.id, request.body)
    .then(function (player) {
      response.send(player);
    })
    .catch(function (error) {
      response.send(error);
    });
};

player_handler.removePlayer = function(request, response) {
  Player.remove({ _id: request.params.id })
    .then(function (player) {
      response.send(request.params.id + ' was removed');
    })
    .catch(function (error) {
      response.send(error);
    });
};

module.exports = player_handler;
