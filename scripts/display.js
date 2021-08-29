const display = {
    gridOne: initGrid('grid-one', 1),
    gridTwo: initGrid('grid-two', 2),
    initGrid(gridId, gridNum) {
        const grid = document.getElementById(gridId)
        for (let i = 0; i < 10; i++) {
            const row = initGridRow(gridNum, i)
            grid.appendChild(row)
        }
    },
    initGridRow(gridNum, rowNum) {
        const row = document.createElement('div')
        row.classList = 'grid-row'
        row.id = `${gridNum}: ${rowNum}`
        for (let i = 1; i < 11; i++) {
            const box = initGridBox(gridNum, rowNum, i)
            row.appendChild(box)
        }
        return row
    },
    initGridBox(gridNum, rowNum, boxNum) {
        const box = document.createElement('div')
        box.classList = 'grid-box'
        const boxNum = rowNum * 10 + boxNum
        box.id = `${gridNum}: ${boxNum}`
        return box
    }
}

export {display}