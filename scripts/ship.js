const createShip = (len) => ({
    length: len,
    health: len,
    getLength() {return this.length},
    getHealth() {return this.health},
    reduceHealth() {
        this.health = this.health - 1;
    },
    isSunk() {
        if (this.health == 0) {
            return true
        } else {
            return false
        }
    },
    hit(object, position) {
        object[position] = 'hit';
    }
});

module.exports = createShip;