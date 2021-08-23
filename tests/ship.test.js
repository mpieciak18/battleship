const createShip = require('../scripts/ship');

test('Create a ship w/ length of 5 and return same length using object getter', () => {
    expect(createShip(5).getLength()).toBe(5);
});

test('Create a ship w/ length of 5 and return same length using object property', () => {
    expect(createShip(5).length).toBe(5);
});

test('Create a ship and confirm that it is not sunk', () => {
    expect(createShip(5).isSunk()).toBe(false);
});

test('Create a ship w/ length of 5 and return health of 5', () => {
    expect(createShip(5).getHealth()).toBe(5);
});

test('Create a ship w/ length of 5, reduce health once, & return health of 4', () => {
    const ship = createShip(5);
    ship.reduceHealth();
    expect(ship.getHealth()).toBe(4);
});

test('Create a ship w/ length of 5 & return health of 0 after 5 health reductions', () => {
    const ship = createShip(5);
    for (let i = 0; i < ship.length; i++) {
        ship.reduceHealth();
    };
    expect(ship.getHealth()).toBe(0);
});

test('Create a ship w/ length of 5 & confirm that it is sunk after 5 health reductions', () => {
    const ship = createShip(5);
    for (let i = 0; i < ship.length; i++) {
        ship.reduceHealth();
    };
    expect(ship.isSunk()).toBe(true);
});

test('Create a ship, receive hit, & return damaged health', () => {
    const ship = createShip(5);
    ship.hit();
    expect(ship.health).toBe(4);
});