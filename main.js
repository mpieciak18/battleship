import {initBaseDisplay, initGrids, initShipsUi, initPlays} from './scripts/display.js'
import {createGame} from './scripts/game.js'
import {randSpot} from './scripts/botlogic.js'

const game = createGame()
const display = initBaseDisplay()
const grids = initGrids(display)
const shipsUi = initShipsUi(grids, game)
shipsUi.init()
const spotsUi = initPlays(game, randSpot)
spotsUi.enablePlay()