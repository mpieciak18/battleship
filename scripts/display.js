const initDisplay = () => ({
    initGrid(gridId, gridNum) {
        const grid = document.getElementById(gridId)
        for (let i = 0; i < 10; i++) {
            const row = this.initGridRow(gridNum, i)
            grid.appendChild(row)
        }
        console.log(grid)
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

export {initDisplay}