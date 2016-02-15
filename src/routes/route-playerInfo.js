'use strict';

var express = require('express');
var router = express.Router();
var playerHandler = require('./handlers/player-handler');

module.exports = function searchPlayers(authenticat) {
  router.get('/', playerHandler.getAll);
  router.post('/',authenticat.roleAuth(), playerHandler.createPlayer);
  router.get('/find/:playerName', playerHandler.getPlayerByName);
  router.put('/:id', authenticat.roleAuth(), playerHandler.updatePlayerInfo);
  router.delete('/:id',authenticat.roleAuth(), playerHandler.removePlayer);
  return router;
};
