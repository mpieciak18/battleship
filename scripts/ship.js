const createShip = (len, ind = undefined, spotsArr = []) => ({
    length: len,
    health: len,
    index: ind,
    spots: spotsArr,
    getLength() {return this.length},
    getHealth() {return this.health},
    getsDamaged() {
        this.health -= 1;
    },
    isSunk() {
        if (this.health == 0) {
            return true
        } else {
            return false
        }
    }
});

module.exports = createShip;