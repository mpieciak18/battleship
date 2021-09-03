const initBaseDisplay = () => ({
    initGrid(gridId, gridNum) {
        const grid = document.getElementById(gridId)
        for (let i = 0; i < 10; i++) {
            const row = this.initGridRow(gridNum, i)
            grid.appendChild(row)
        }
        return grid
    },
    initGridRow(gridNum, rowNum) {
        const row = document.createElement('div')
        row.classList = 'grid-row'
        row.id = `${gridNum}: ${rowNum}`
        for (let i = 1; i < 11; i++) {
            const box = this.initGridBox(gridNum, rowNum, i)
            row.appendChild(box)
        }
        return row
    },
    initGridBox(gridNum, rowNum, num) {
        const box = document.createElement('div')
        box.classList = 'grid-box'
        const boxNum = rowNum * 10 + num
        box.id = `${gridNum}: ${boxNum}`
        return box
    }
})

const initGrids = (display) => ({
    gridOne: display.initGrid('grid-one', 1),
    gridTwo: display.initGrid('grid-two', 2),
})

const initShipsUi = (grids, game) => ({
    init() {
        game.initShips()
        const playerShips = game.pOneShips
        const shipSpots = [].concat(...playerShips)
        for (let i = 0; i < shipSpots.length; i++) {
            const spot = shipSpots[i]
            this.colorSpot(spot, grids.gridTwo, 'player-boat')
        }
    },
    colorSpot(spot, grid, shipClass) {
        let rowNum = ''
        if (spot % 10 == 0) {
            rowNum = spot / 10 - 1
        } else {
            rowNum = Math.floor(spot / 10)
        }
        const row = grid.children[rowNum]
        let boxNum = ''
        if (spot % 10 == 0) {
            boxNum = 9
        } else {
            boxNum = spot % 10 - 1
        }
        const box = row.children[boxNum]
        box.classList.add(shipClass)
        // Remove 'hit' class is ship is sunk
        // if (shipClass = 'ship-sunk') {
        //     box.classList.remo
        // }
    }
})

const initPlayStatus = (game, shipsUi, grids) => ({
    displayHit(spot, spotNum, player) {
        spot.innerText = '✕'
        // Checks if spot is occupied (on the correct player's board)
        // and if the landed hit also sunk the associated ship
        let occupied = ''
        let shipSunk = ''
        let shipInd = ''
        if (player == 'user') {
            occupied = game.playerTwo.board.positions[spotNum].occupied
            if (occupied == true) {
                shipInd = game.playerTwo.board.positions[spotNum].ship
                shipSunk = game.playerTwo.board.ships[shipInd].isSunk()
            }
        } else {
            occupied = game.playerOne.board.positions[spotNum].occupied
            if (occupied == true) {
                shipInd = game.playerOne.board.positions[spotNum].ship
                shipSunk = game.playerOne.board.ships[shipInd].isSunk()
            }
        }
        // Assigns appropriate class to hit spot, whether hit lands & sinks ship,
        // hit lands without sinking ship, or hit misses ship
        if (occupied == true && shipSunk == true) {
            this.displaySunkShip(shipInd, player)
        } else if (occupied == true && shipSunk == false) {
            spot.classList.add('landed-hit')
        } else {
            spot.classList.add('missed-hit')
        }
    },
    displaySunkShip(index, player) {
        let shipSpots = ''
        let grid = ''
        if (player == 'user') {
            shipSpots = game.playerTwo.board.ships[index].spots
            grid = grids.gridOne
        } else {
            shipSpots = game.playerOne.board.ships[index].spots
            grid = grids.gridTwo
        }
        for (let i = 0; i < shipSpots.length; i++) {
            const spot = shipSpots[i]
            shipsUi.colorSpot(spot, grid, 'sunk-ship')
        }
    },
    changePlayStatus(player) {
        const playStatus = document.getElementById('status')
        if (player == 'user') {
            playStatus.innerText = 'It\'s Player One\'s Turn'
        } else {
            playStatus.innerText = 'It\'s Player Two\'s Turn'
        }
    },
    gameWon() {
        const playStatus = document.getElementById('status')
        const winner = game.checkWhoWon()
        if (winner == 'Player 1') {
            playStatus.innerText = 'Player 1 Wins!'
        } else {
            playStatus.innerText = 'Player 2 Wins!'
        }
    }
})

const initPlays = (game, botLogic, shipsUi, grids) => ({
    playStatus: initPlayStatus(game, shipsUi, grids),
    enablePlay() {
        for (let i = 1; i <= 100; i++) {
            const box = document.getElementById(`1: ${i}`)
            const classArr = [...box.classList]
            if (classArr.includes('landed-hit') || classArr.includes('missed-hit') == false) {
                box.addEventListener('click', (event) => this.userPlays(event))
            }
        }
    },
    disablePlay() {
        for (let i = 1; i <= 100; i++) {
            const box = document.getElementById(`1: ${i}`)
            const classArr = [...box.classList]
            if (classArr.includes('landed-hit') || classArr.includes('missed-hit') == false) {
                box.removeEventListener('click', (event) => this.userPlays(event))
            }
        }
    },
    // User's async play function containing await delay
    async userPlays(event) {
        // Proceeds if it is player 1's turn
        if (game.whoseTurn == 'Player 1') {
            const spot = event.target
            const spotNum = Number(spot.id.slice(2))
            // Proceeds if the spot has not been played already
            if (game.playerTwo.board.positions[spotNum].hit == false) {
                // Submits play to game object and displays hit via DOM
                game.pOnePlays(spotNum)
                this.playStatus.displayHit(spot, spotNum, 'user')
                // Checks for win and proceeds to bot's play or indicates game as won
                if (game.checkForWin() != true) {
                    this.disablePlay()
                    this.playStatus.changePlayStatus('bot')
                    await wait(500)
                    this.botPlays()
                } else {
                    this.playStatus.gameWon()
                }
            }
        }
    },
    // Bot's play function
    botPlays() {
        // Makes selection using botlogic attribute
        const botSelection = botLogic(game.playerOne)
        const spotNum = botSelection
        const spot = document.getElementById(`2: ${spotNum}`)
        // Submits play to game object and displays hit via DOM
        game.pTwoPlays(spotNum)
        this.playStatus.displayHit(spot, spotNum, 'bot')
        // Checks for win and proceeds to bot's play or indicates game as won
        if (game.checkForWin() != true) {
            this.enablePlay()
            this.playStatus.changePlayStatus('user')
        } else {
            this.playStatus.gameWon()
        }
    }
})

// Creates delay in async functions
function wait(ms)  {
    return new Promise( resolve => { setTimeout(resolve, ms); });
}

export {initBaseDisplay, initGrids, initShipsUi, initPlays}