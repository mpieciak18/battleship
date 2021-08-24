const createGameboard = require('../scripts/gameboard');

const createPlayer = () => ({
    gameboard: undefined,
    initGameboard() {
        this.gameboard = createGameboard();
    },
    attack(otherPlayer, spot) {
        otherPlayer.gameboard.receiveAttack(spot);
    }
});

module.exports = createPlayer;