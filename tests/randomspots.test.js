import { initRandSpotsArr } from "../scripts/randomspots.js"

test('Create an array of ships, with one of each length 1-5, and confirm there are 5 ships created in total', () => {
    const desiredShipLengths = [5, 4, 3, 2, 1]
    const ships = initRandSpotsArr(desiredShipLengths)
    const numShips = ships.length

    expect(numShips).toEqual(5)
}) 

test('Create an array of ships, with one of each length 1-5, and confirm there are 15 spots occupied', () => {
    const desiredShipLengths = [5, 4, 3, 2, 1]
    const ships = initRandSpotsArr(desiredShipLengths)
    const occupiedSpots = ships.flat()
    const totalSpots = occupiedSpots.length

    expect(totalSpots).toEqual(15)
})

test('Create an array of ships, with one of each length 1-5, & confirm there are 15 unique spots occupied w/ 0 duplicates', () => {
    const desiredShipLengths = [5, 4, 3, 2, 1]
    const ships = initRandSpotsArr(desiredShipLengths)
    const occupiedSpots = ships.flat()

    const duplicates = occupiedSpots.filter((spot, index) => index !== occupiedSpots.indexOf(spot));

    expect(duplicates).toEqual([])
})