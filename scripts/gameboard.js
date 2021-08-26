const createShip = require('../scripts/ship');

const createGameboard = () => ({
    positions: initPositions(),
    ships: {},
    missedHits: [],
    landedHits: [],
    initShip(ind, len, spots) {
        const newShip = createShip(len, ind, spots);
        this.ships[ind] = newShip;
        for (let i = 0; i < spots.length; i++) {
            const spot = spots[i]
            this.positions[spot].occupied = true;
            this.positions[spot].ship = ind;
        };
    },
    receiveAttack(spot) {
        this.positions[spot].hit = true;
        if (this.positions[spot].occupied == true) {
            const shipIndex = this.positions[spot].ship;
            this.ships[shipIndex].getsDamaged();
            this.landedHits.push(spot);
        } else {
            this.missedHits.push(spot);
        };
        // return 'attack received';
    },
    checkAllSunk() {
        const shipObjArr = Object.entries(this.ships);
        for (let i = 0; i < shipObjArr.length; i++) {
            if (shipObjArr[i][1].isSunk() == false) {
                return false
            } else {
                continue
            }
        }
        return true
    }
});

const initPositions = () => {
    const obj = {}
    for (let i = 1; i <= 100; i++) {
        obj[i] = {
            occupied: false,
            ship: null,
            hit: false
        }
    }
    return obj
};

module.exports = createGameboard;