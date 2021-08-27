const createPlayer = require('../scripts/player');

test('Create player with gameboard & check that its gameboard\'s positions property contain keys 1-100', () => {
    const player = createPlayer();

    const testSpots = [];
    for (let i = 1; i <= 100; i++) {
        testSpots.push(i.toString());
    };
    const gameSpots = Object.keys(player.board.positions);
    
    expect(gameSpots).toEqual(testSpots);
});

test('Create two players & gameboards without ships, have player 1 attack an empty spot, and return hit spot', () => {
    const player1 = createPlayer();
    const player2 = createPlayer();

    player1.attack(player2, 45);

    expect(player2.board.missedHits).toEqual([45]);
});

test('Create two players & gameboards, add ship to player 2, attack it, & return hit spot via landedHits property', () => {
    const player1 = createPlayer();
    const player2 = createPlayer();
    player2.board.initShip(0, 3, [5,15,25])

    player1.attack(player2, 15);

    expect(player2.board.landedHits).toEqual([15]);
});

test('Create two players & gameboards, add ship to player 2, attack it, & check if spot is recorded as hit & occupied', () => {
    const player1 = createPlayer();
    const player2 = createPlayer();
    player2.board.initShip(0, 3, [5,15,25])

    player1.attack(player2, 15);
    const hitSpot = player2.board.positions[15];

    expect(hitSpot.occupied && hitSpot.hit).toBeTruthy();
});

test('Create two players & gameboards, add ship to player 2, sink it, & confirm ship is sunk', () => {
    const player1 = createPlayer();
    const player2 = createPlayer();
    player2.board.initShip(0, 5, [5,15,25,35,45])
    const shipSpots = player2.board.ships[0].spots;

    shipSpots.map(i => player1.attack(player2, i));
    const ship = player2.board.ships[0];
    
    expect(ship.isSunk()).toBeTruthy();
});