import {initBaseDisplay, renderDom} from './scripts/display.js'

const display = initBaseDisplay()
const dom = renderDom(display)
dom.initShips()