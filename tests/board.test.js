import {createBoard} from '../scripts/board.js'

test('Create gameboard object and return positions property with (blank) spots 1-100', () => {
    const board = createBoard();
    const spots = board.positions;
    const testSpots = {};
    for (let i = 1; i <= 100; i++) {
        testSpots[i] = {
            occupied: false,
            ship: null,
            hit: false
        };
    };
    expect(spots).toEqual(testSpots);
});

test('Create gameboard object, create ship, and return ship\'s health', () => {
    const board = createBoard();
    board.initShip(0, 5, []);
    expect(board.ships[0].health).toBe(5);
});

test('Create gameboard object, create ship that occupies spots, and check if a spot is occupied', () => {
    const board = createBoard();
    board.initShip(0, 5, [25, 35, 45, 55, 65]);
    expect(board.positions[45].occupied).toBe(true);
});

test('Create gameboard object, create ship that occupies spots, receive attack, and check if ship is damaged', () => {
    const board = createBoard();
    board.initShip(0, 5, [25, 35, 45, 55, 65]);
    board.receiveAttack(45);
    expect(board.ships[0].health).toBe(4);
});

test('Create gameboard object, receive attack on empty spot, and return attacked spot', () => {
    const board = createBoard();
    board.receiveAttack(45);
    expect(board.missedHits[0]).toBe(45);
});

test('Create gameboard object, create ship, damage ship until health == 0, and check if all ships are sunk', () => {
    const board = createBoard();
    const shipSpots = [25, 35, 45, 55, 65];
    board.initShip(0, 5, shipSpots);
    for (let i = 0; i < shipSpots.length; i++) {
        const spot = shipSpots[i]
        board.receiveAttack(spot);
    }
    expect(board.checkAllSunk()).toBe(true);
});