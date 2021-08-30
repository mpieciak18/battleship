import {createGame} from './game.js'

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

const renderDom = (display) => ({
    gridOne: display.initGrid('grid-one', 1),
    gridTwo: display.initGrid('grid-two', 2),
    gameObj: createGame(),
    initShips() {
        this.gameObj.initShips()
        const playerShips = this.gameObj.pOneShips
        const spots = [].concat(...playerShips)
        for (let i = 0; i < spots.length; i++) {
            const spot = spots[i]
            this.colorSpot(spot, this.gridTwo)
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

export {initBaseDisplay, renderDom}