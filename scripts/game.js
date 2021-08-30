import {createPlayer} from '../scripts/player.js'

const createGame = (whoPlaysFirst = 'Player 1') => ({
    playerOne: createPlayer('Player 1'),
    pOneShips: [
        [4],[9],[22,23,24,25],[30,40,50],[45],[47],[52,53],[67,68],[83,84,85],[87,88]
    ],
    playerTwo: createPlayer('Player 2'),
    pTwoShips: [
        [7],[24,25],[31],[38,39],[46],[58],[63,73],[65,75,85],[77,87,97],[70,80,90,100]
    ],
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