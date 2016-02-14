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

player_handler.getPlayerById = function(request, response) {
  Player.findById(request.params.id).then(function (player) {
    if (player) {
      response.send(player);
    }
  }).then(null, function (error) {
    response.send(error);
  });
};

player_handler.getPlayerByName = function(request, response) {
  var playerName = request.query.name.toUpperCase();
  Player.find({ name: playerName } ).then(function (player) {

  }).then(null, function (error) {

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
      response.json(player)
    })
    .catch(function(error){
      response.send(error);
    });
};

player_handler.updateWholeObject = function(request, response) {
  Player.findById(request.params.id).then(function (player) {
    if (player) {
      var playerkeys = ['name', 'team', 'age', 'height', 'position', 'rookie', 'numberOfGamesPlayed', 'totals', 'average'];
      for (var ii in playerkeys) {
        if (request.body[playerkeys[ii]]) {
          player[playerkeys[ii]] = request.body[playerkeys[ii]];
        } else {
          player[playerkeys[ii]] = null;
        }
      }
      return player;
    }
  }).then(function (player) {
    if (player) {
      player.save(function (error, player) {
        if (!error) {
          response.send(player);
        } else {
          response.send(error);
        }
      });
    }
  }).then(null, function (error) {
    if (error) {
      response.send(error);
    }
  });
};

player_handler.updatePlayerInfo= function(request, response) {
  Player.update({ _id: request.params.id }, { $set: request.body }, function (error) {
    if (error) {
      response.send(error);
    } else {
      response.send('update data was a success');
    }
  });
};

player_handler.removePlayer = function(request, response) {
  Player.remove({ _id: request.params.id }).then(function (player, error) {
    if (player) {
      response.send(request.params.id + ' was removed');
    }
  }).then(null, function (error) {
    if (error) {
      response.send(error);
    }
  });
};

module.exports = player_handler;
