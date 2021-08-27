const createBoard = require('./board');

const createPlayer = (playerName) => ({
    name: playerName,
    board: createBoard(),
    initBoard() {
        this.board = createBoard();
    },
    attack(otherPlayer, spot) {
        otherPlayer.board.receiveAttack(spot);
    }
});

module.exports = createPlayer;