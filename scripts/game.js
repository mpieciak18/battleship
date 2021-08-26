const createPlayer = require('../scripts/player')

const createGame = (whoPlaysFirst = 0) => ({
    playerOne: createPlayer('Player 1'),
    playerTwo: createPlayer('Player 2'),
    playsNext: whoPlaysFirst,
    winner: '',

    initShips() {
        const pOneShips = [
            [4],[9],[22,23,24,25],[30,40,50],[45],[47],[52,53],[67,68],[83,84,85],[87,88]
        ];
        const pTwoShips = [
            [7],[24,25],[31],[38,39],[46],[58],[63,73],[65,75,85],[77,87,97],[70,80,90,100]
        ];
        for (let i = 0; i < 10; i++) {
            this.playerOne.gameboard.initShip(i, pOneShips[i].length, pOneShips[i])
            this.playerTwo.gameboard.initShip(i, pTwoShips[i].length, pTwoShips[i])
        };
    },
    pOnePlays(spot) {
        this.playerOne.attack(this.playerTwo, spot)
        this.playsNext = 1
    },
    pTwoPlays(spot) {
        this.playerTwo.attack(this.playerOne, spot)
        this.playsNext = 0
    },
    checkForWin() {
        if (this.playerOne.gameboard.checkAllSunk() == true) {
            this.winner = 'Player 2'
            return true
        } else if (this.playerTwo.gameboard.checkAllSunk() == true) {
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

module.exports = createGame;