const createGame = (playerOne, playerTwo, whoPlaysFirst = 0) => ({
    playsNext: whoPlaysFirst,
    winner: '',
    pOnePlays(spot) {
        playerOne.attack(playerTwo, spot)
        this.playsNext = 1
    },
    pTwoPlays(spot) {
        playerTwo.attack(playerOne, spot)
        this.playsNext = 0
    },
    checkForWin() {
        if (playerOne.gameboard.checkAllSunk() == true) {
            this.winner = 'Player 2'
            return true
        } else if (playerTwo.gameboard.checkAllSunk() == true) {
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