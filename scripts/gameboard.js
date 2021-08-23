const createShip = require('../scripts/ship');

const createGameboard = () => ({
    positions: initPositions(),
    ships: {},
    initShip(ind, len, spots) {
        const newShip = createShip(len);
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
            this.ships[shipIndex].hit();
        };
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