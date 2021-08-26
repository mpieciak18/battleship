const createGameboard = require('../scripts/gameboard');

const createPlayer = (playerName) => ({
    name: playerName,
    gameboard: createGameboard(),
    initGameboard() {
        this.gameboard = createGameboard();
    },
    attack(otherPlayer, spot) {
        otherPlayer.gameboard.receiveAttack(spot);
    }
});

module.exports = createPlayer;