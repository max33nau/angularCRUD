var express = require('express');
var path = require('path');
var router = express.Router();
var playerHandler = require('./handlers/player-handler');

module.exports = function searchPlayers(authenticat) {
  router.get('/', authenticat.tokenAuth, playerHandler.getAll);
  router.post('/',authenticat.tokenAuth,authenticat.roleAuth(), playerHandler.createPlayer);
  router.get('/find/:playerName',authenticat.tokenAuth, playerHandler.getPlayerByName);
  router.put('/:id',authenticat.tokenAuth, authenticat.roleAuth(), playerHandler.updatePlayerInfo);
  router.delete('/:id',authenticat.tokenAuth,authenticat.roleAuth(), playerHandler.removePlayer);
  return router;
}
