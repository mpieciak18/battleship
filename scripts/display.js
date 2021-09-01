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
            this.colorSpot(spot, grids.gridTwo)
        }
    },
    colorSpot(spot, grid) {
        const rowNum = Math.floor(spot / 10)
        const row = grid.children[rowNum]
        let boxNum = ''
        if (spot % 10 == 0) {
            boxNum = 9
        } else {
            boxNum = spot % 10 - 1
        }
        const box = row.children[boxNum - 1]
        box.classList.add('player-boat')
    }
})

const initSpotsUi = (game, botLogic) => ({
    enablePlay() {
        for (let i = 1; i <= 100; i++) {
            const box = document.getElementById(`1: ${i}`)
            const classArr = [...box.classList]
            if (classArr.includes('landed-hit') || classArr.includes('missed-hit') == false) {
                box.addEventListener('click', (event) => this.userPlays(event))
                box.event
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
    async userPlays(event) {
        if (game.whoseTurn == 'Player 1') {
            const spot = event.target
            const spotNum = Number(spot.id.slice(2))
            game.pOnePlays(spotNum)
            this.displayHit(spot, spotNum, 'user')
            if (game.checkForWin() != true) {
                this.disablePlay()
                this.changePlayStatus('bot')
                await wait(1000)
                this.botPlays()
            } else {
                this.gameWon()
            }
        }
    },
    botPlays() {
        const botSelection = botLogic(game.playerOne)
        const spotNum = botSelection
        const spot = document.getElementById(`2: ${spotNum}`)
        game.pTwoPlays(spotNum)
        this.displayHit(spot, spotNum, 'bot')
        if (game.checkForWin() != true) {
            this.enablePlay()
            this.changePlayStatus('user')
        } else {
            this.gameWon()
        }
    },
    displayHit(spot, spotNum, player) {
        spot.innerText = '✕'
        let hitStatus = ''
        if (player == 'user') {
            hitStatus = game.playerTwo.board.positions[spotNum].hit
        } else {
            hitStatus = game.playerOne.board.positions[spotNum].hit
        }
        if (hitStatus == true) {
            spot.classList.add('landed-hit')
        } else {
            spot.classList.add('missed-hit')
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
            playStatus.innerText = 'game.playerOne.board.positionsPlayer 1 Wins!'
        } else {
            playStatus.innerText = 'Player 2 Wins!'
        }
    }
})

function wait(ms)  {
    return new Promise( resolve => { setTimeout(resolve, ms); });
}

export {initBaseDisplay, initGrids, initShipsUi, initSpotsUi}