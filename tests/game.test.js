const createPlayer = require('../scripts/player');
const {randSpot, incSpot, setSpot} = require('../scripts/botlogic');
const createGame = require('../scripts/game');

test('Init game w/ two players & ships, guarantee player 1 to win, and check for win', () => {
    const playerOne = createPlayer();
    playerOne.initGameboard();

    const playerTwo = createPlayer();
    playerTwo.initGameboard();
    playerTwo.gameboard.initShip(0, 5, [10,20,30,40,50]);

    const pOneLogic = () => {
        const spotsArr = [10,20,30,40,50];
        const spot = setSpot(playerTwo, spotsArr)
        return spot
    };

    const whoPlaysFirst = 0;
    const game = createGame(playerOne, playerTwo, whoPlaysFirst)

    for (let i = 0; i < 5; i++) {
        game.pOnePlays(pOneLogic())
    }

    expect(game.checkForWin()).toBe(true);
});

test('Init game w/ two players & ships, use incremental logic player 1 & rand logic for player 2, and return player 1 as winner', () => {
    const playerOne = createPlayer();
    playerOne.initGameboard();
    playerOne.gameboard.initShip(0, 5, [5,15,25,35,45]);

    const playerTwo = createPlayer();
    playerTwo.initGameboard();
    playerTwo.gameboard.initShip(0, 5, [10,20,30,40,50]);

    const pOneLogic = () => {
        const spotsArr = [10,20,30,40,50];
        const spot = setSpot(playerTwo, spotsArr)
        return spot
    };
    const pTwoLogic = () => {
        const spot = randSpot(playerOne, 1)
        return spot
    };

    const whoPlaysFirst = 0;
    const game = createGame(playerOne, playerTwo, whoPlaysFirst)

    for (let i = 0; i < 9; i++) {
        if (game.playsNext == 0) {
            game.pOnePlays(pOneLogic())
        } else {
            game.pTwoPlays(pTwoLogic())
        }
    }

    game.checkForWin();
    const winner = game.checkWhoWon();

    expect(winner).toBe('Player 1');
});

test('Init game w/ two bot players & ships, use incremental logic for plays, and return player 1 as winner', () => {
    const playerOne = createPlayer();
    playerOne.initGameboard();
    playerOne.gameboard.initShip(0, 5, [5,15,25,35,45]);

    const playerTwo = createPlayer();
    playerTwo.initGameboard();
    playerTwo.gameboard.initShip(0, 5, [1,2,3,4,5]);

    const pOneLogic = () => {
        const spot = incSpot(playerTwo, 1)
        return spot
    };
    const pTwoLogic = () => {
        const spot = incSpot(playerOne, 1)
        return spot
    };

    const whoPlaysFirst = 0;
    const game = createGame(playerOne, playerTwo, whoPlaysFirst)

    for (let i = 0; i < 9; i++) {
        if (game.playsNext == 0) {
            game.pOnePlays(pOneLogic())
        } else {
            game.pTwoPlays(pTwoLogic())
        }
    }

    game.checkForWin();
    const winner = game.checkWhoWon();

    expect(winner).toBe('Player 1');
});