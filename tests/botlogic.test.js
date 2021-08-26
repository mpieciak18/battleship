const {randSpot, incSpot, setSpot} = require('../scripts/botlogic');
const createPlayer = require('../scripts/player');

test('Create bot & other player, have bot attack player, and confirm hit landed somewhere on the board', () => {
    const player = createPlayer();
    player.initGameboard();
    player.gameboard.initShip(0, 5, [5, 15, 25, 35, 45]);

    const bot = createPlayer();
    const spot = randSpot(player)
    bot.attack(player, spot);

    expect(
        player.gameboard.landedHits.length == 1 
        || player.gameboard.missedHits.length == 1
    ).toBeTruthy();
});

test('Create two players, have player 1 attack (and miss) player 2 five times incrementally, and confirm missed hits', () => {
    const playerOne = createPlayer();
    playerOne.initGameboard();
    const playerTwo = createPlayer();
    playerTwo.initGameboard();

    for (let i = 0; i < 5; i++) {
        playerOne.attack(playerTwo, incSpot(playerTwo, 1));
    };

    expect(playerTwo.gameboard.missedHits).toEqual([1, 2, 3, 4, 5]);
});

test('Create two players, have player 1 attack (and hit) player 2 five times incrementally, and confirm landed hits', () => {
    const playerOne = createPlayer();
    playerOne.initGameboard();
    const playerTwo = createPlayer();
    playerTwo.initGameboard();
    playerTwo.gameboard.initShip(0, 5, [1, 2, 3, 4, 5]);

    for (let i = 0; i < 5; i++) {
        playerOne.attack(playerTwo, incSpot(playerTwo, 1));
    };

    expect(playerTwo.gameboard.landedHits).toEqual([1, 2, 3, 4, 5]);
});

test('Create two players, have player 1 attack (and miss) player 2 on spots [10,20,30,40,50], and confirm missed hits', () => {
    const playerOne = createPlayer();
    playerOne.initGameboard();
    const spotsArr = [10,20,30,40,50];

    const playerTwo = createPlayer();
    playerTwo.initGameboard();

    for (let i = 0; i < 5; i++) {
        playerOne.attack(playerTwo, setSpot(playerTwo, spotsArr));
    };

    expect(playerTwo.gameboard.missedHits).toEqual([10, 20, 30, 40, 50]);
});

test('Create two players, have player 1 attack (and hit) player 2 on spots [10,20,30,40,50], and confirm landed hits', () => {
    const playerOne = createPlayer();
    playerOne.initGameboard();
    const spotsArr = [10,20,30,40,50];

    const playerTwo = createPlayer();
    playerTwo.initGameboard();
    playerTwo.gameboard.initShip(0, 5, [10, 20, 30, 40, 50]);

    for (let i = 0; i < 5; i++) {
        playerOne.attack(playerTwo, setSpot(playerTwo, spotsArr));
    };

    expect(playerTwo.gameboard.landedHits).toEqual([10, 20, 30, 40, 50]);
});