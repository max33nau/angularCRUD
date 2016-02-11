var express = require('express');
var path = require('path');
var router = express.Router();
var playerHandler = require('./handlers/player-handler');

module.exports = function mainPage() {
  // router.get('/find', playerHandler.getPlayerByName);
  router.get('/', playerHandler.getAll);
  // router.get('/:id', playerHandler.getPlayerById);
  // router.post('/', playerHandler.createPlayer);
  // router.put('/:id', playerHandler.updateWholeObject);
  // router.patch('/:id', playerHandler.updatePlayerInfo);
  // router.delete('/:id', playerHandler.removePlayer);
  return router;
}
