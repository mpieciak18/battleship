import {createBoard} from './board.js'

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

export {createPlayer}