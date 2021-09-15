import {surroundingSpots as getSurrSpots} from './surroundingspots.js'

// Function that takes an array of desired ship lengths and returns an array (of arrays) 
// of randomly chosen spot that are occupied by the ships.
const initRandSpotsArr = (arr) => {
    // Init variables for array of arrays (of ship spots) and array of surrounding spots (for ships).
    let arrOfArrs = []
    let surrSpots = []
    // Loop through each of the desired ship lengths
    for (let i = 0; i < arr.length; i++) {
        const desiredLen = arr[i]
        let subArr = []
        // Add numbers to subArr until it reaches the desired length
        while (subArr.length < desiredLen) {
            // Choose first number of subArr randomly, only if number is not in arrOfArrs or surrSpots
            if (subArr.length == 0) {
                const randNum = selectRandNum()
                if (!arrOfArrs.flat().includes(randNum) && !surrSpots.includes(randNum)) {
                    subArr.push(randNum)
                } else {
                    continue
                }
            // Choose subsequent numbers of subArr based on randomly selected direction
            } else {
                let lastNum = subArr[subArr.length - 1]
                const direction = selectDirection()
                let nextNum = incDirection(lastNum, direction)
                // Add numbers, only if certain rules are met
                for (let i = 1; i < desiredLen; i++) {
                    if (checkRules(lastNum, direction) && !arrOfArrs.flat().includes(nextNum) && !surrSpots.includes(nextNum)) {
                        subArr.push(nextNum)
                        lastNum = subArr[subArr.length - 1]
                        nextNum = incDirection(lastNum, direction)
                    } else {
                        subArr = []
                        break
                    }
                }
            }
        }
        // Once subArr is complete, push it to arrOfArrs & update surrSpots
        arrOfArrs.push(subArr)
        surrSpots.push(getSurrSpots(subArr))
    }
    return arrOfArrs
}

const selectRandNum = () => {
    const int = Math.random() * 100
    const num = Math.ceil(int)
    return num
}

// Randomly selects if the next number should go up, down, left, right
const selectDirection = () => {
    const selection = Math.random() * 100
    if (selection < 25) {
        return 'up'
    } else if (selection >= 25 && selection < 50) {
        return 'right'
    } else if (selection >= 50 && selection < 75) {
        return 'down'
    } else if (selection >= 75) {
        return 'left'
    }
}

// Returns the next number, relative to the intended direction from the previous number
const incDirection = (num, direction) => {
    if (direction == 'up') {
        return (num - 10)
    } else if (direction == 'right') {
        return (num + 1)
    } else if (direction == 'down') {
        return (num + 10)
    } else if (direction == 'left') {
        return (num - 1)
    }
}

// Checks if number can continue in its chosen direction (without going off the 10x10 grid)
const checkRules = (prevNum, direction) => {
    if (direction == 'up') {
        return (prevNum > 10)
    } else if (direction == 'right') {
        return (prevNum % 10 != 0)
    } else if (direction == 'down') {
        return (prevNum < 91)
    } else if (direction == 'left') {
        return (prevNum % 10 != 1)
    }
}

export {initRandSpotsArr}