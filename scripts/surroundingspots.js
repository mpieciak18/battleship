// Takes an array of ship spots and returns an array of spots
// that surround the ship spots on a 10x10 grid gameboard
const surroundingSpots = (shipSpots) => {
    let surrSpots = []

    for (let i = 0; i < shipSpots.length; i++) {
        const spot = shipSpots[i]
        // Create array of shipSpots, minus shipSpots[i]
        let firstSlice = shipSpots.slice(0, i)
        let secondSlice = []
        if (i < shipSpots.length - 1) {
            secondSlice = shipSpots.slice(i+1)
        }
        const otherSpots = firstSlice.concat(secondSlice)
        // Check for upper-left spot
        const upperLeft = spot - 11
        if (spot > 10 && spot % 10 != 1 && surrSpots.includes(upperLeft) != true
            && otherSpots.includes(upperLeft) != true) {
            surrSpots.push(upperLeft)
        }
        // Check for upper-middle spot
        const upperMiddle = spot - 10
        if (spot > 10 && surrSpots.includes(upperMiddle) != true
            && otherSpots.includes(upperMiddle) != true) {
            surrSpots.push(upperMiddle)
        }
        // Check for upper-right spot
        const upperRight = spot - 9
        if (spot > 10 && spot % 10 != 0 && surrSpots.includes(upperRight) != true
            && otherSpots.includes(upperRight) != true) {
            surrSpots.push(upperRight)
        }
        // Check for middle-left spot
        const middleLeft = spot - 1
        if (spot % 10 != 1 && surrSpots.includes(middleLeft) != true 
            && otherSpots.includes(middleLeft) != true) {
            surrSpots.push(middleLeft)
        }
        // Check for middle-right spot
        const middleRight = spot + 1
        if (spot % 10 != 0 && surrSpots.includes(middleRight) != true
            && otherSpots.includes(middleRight) != true) {
            surrSpots.push(middleRight)
        }
        // Check for bottom-left spot
        const bottomLeft = spot + 9
        if (spot < 91 && spot % 10 != 1 && surrSpots.includes(bottomLeft) != true
            && otherSpots.includes(bottomLeft) != true) {
            surrSpots.push(bottomLeft)
        }
        // Check for bottom-middle spot
        const bottomMiddle = spot + 10
        if (spot < 91 && surrSpots.includes(bottomMiddle) != true
            && otherSpots.includes(bottomMiddle) != true) {
            surrSpots.push(bottomMiddle)
        }
        // Check for bottom-right spot
        const bottomRight = spot + 11
        if (spot < 91 && spot % 10 != 0 && surrSpots.includes(bottomRight) != true
            && otherSpots.includes(bottomRight) != true) {
            surrSpots.push(bottomRight)
        }
    }

    surrSpots.sort(function(a, b){return a-b})
    return surrSpots
}

export {surroundingSpots}