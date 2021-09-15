import {createPlayer} from '../scripts/player.js'
import {initRandSpotsArr} from '../scripts/randomspots.js'

const createGame = (whoPlaysFirst = 'Player 1') => ({
    playerOne: createPlayer('Player 1'),
    pOneShips: initRandSpotsArr([4, 4, 3, 3, 2, 2, 2, 1, 1, 1]),
    playerTwo: createPlayer('Player 2'),
    pTwoShips: initRandSpotsArr([4, 4, 3, 3, 2, 2, 2, 1, 1, 1]),
    whoseTurn: whoPlaysFirst,
    winner: '',

    initShips() {
        for (let i = 0; i < 10; i++) {
            this.playerOne.board.initShip(i, this.pOneShips[i].length, this.pOneShips[i])
            this.playerTwo.board.initShip(i, this.pTwoShips[i].length, this.pTwoShips[i])
        };
    },
    pOnePlays(spot) {
        this.playerOne.attack(this.playerTwo, spot)
        this.whoseTurn = 'Player 2'
    },
    pTwoPlays(spot) {
        this.playerTwo.attack(this.playerOne, spot)
        this.whoseTurn = 'Player 1'
    },
    checkForWin() {
        if (this.playerOne.board.checkAllSunk() == true) {
            this.winner = 'Player 2'
            return true
        } else if (this.playerTwo.board.checkAllSunk() == true) {
            this.winner = 'Player 1'
            return true
        } else {
            return false
        }
    },
    checkWhoWon() {
        return this.winner
    }
});

export {createGame}