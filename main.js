import {initBaseDisplay, initGrids, initShipsUi, initSpotsUi} from './scripts/display.js'
import {createGame} from './scripts/game.js'
import {randSpot} from './scripts/botlogic.js'

const game = createGame()
const display = initBaseDisplay()
const grids = initGrids(display)
const shipsUi = initShipsUi(grids, game)
shipsUi.init()
const spotsUi = initSpotsUi(game, randSpot)
spotsUi.enablePlay()