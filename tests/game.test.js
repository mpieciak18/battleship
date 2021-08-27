const {randSpot, incSpot, setSpot} = require('../scripts/botlogic');
const createGame = require('../scripts/game');

test('Init game w/ two players & ships, guarantee player 1 to win, and check for win', () => {
    const whoPlaysFirst = 0;
    const game = createGame(whoPlaysFirst);
    
    game.playerTwo.board.initShip(0, 5, [10,20,30,40,50]);

    const pOneLogic = () => {
        const spotsArr = [10,20,30,40,50];
        const spot = setSpot(game.playerTwo, spotsArr)
        return spot
    };

    for (let i = 0; i < 5; i++) {
        game.pOnePlays(pOneLogic())
    }

    expect(game.checkForWin()).toBe(true);
});

test('Init game w/ two players & ships, use set logic player 1 & rand logic for player 2, and return player 1 as winner', () => {
    const whoPlaysFirst = 0;
    const game = createGame(whoPlaysFirst)
    game.playerOne.board.initShip(0, 5, [5,15,25,35,45]);
    game.playerTwo.board.initShip(0, 5, [10,20,30,40,50]);

    const pOneLogic = () => {
        const spotsArr = [10,20,30,40,50];
        const spot = setSpot(game.playerTwo, spotsArr)
        return spot
    };
    const pTwoLogic = () => {
        const spot = randSpot(game.playerOne, 1)
        return spot
    };

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
    const whoPlaysFirst = 0;
    const game = createGame(whoPlaysFirst)
    game.playerOne.board.initShip(0, 5, [5,15,25,35,45]);
    game.playerTwo.board.initShip(0, 5, [1,2,3,4,5]);

    const pOneLogic = () => {
        const spot = incSpot(game.playerTwo, 1)
        return spot
    };
    const pTwoLogic = () => {
        const spot = incSpot(game.playerOne, 1)
        return spot
    };

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

test('Init game, players, gameboards, & ships using createGame\'s methods & properties, use random logic for plays, and return winner', () => {
    const whoPlaysFirst = 0;
    const game = createGame(whoPlaysFirst)
    game.initShips();    
    
    const pOneLogic = () => {
        const spot = randSpot(game.playerTwo)
        return spot
    };
    const pTwoLogic = () => {
        const spot = randSpot(game.playerOne)
        return spot
    };

    const simulation = {
        startGame() {
            this.playerOnePlays()
        },
        playerOnePlays() {
            game.pOnePlays(pOneLogic())
            if (game.checkForWin() != true) {
                this.playerTwoPlays();
            } else {
                return
            }
        },
        playerTwoPlays() {
            game.pTwoPlays(pTwoLogic())
            if (game.checkForWin() != true) {
                this.playerOnePlays();
            } else {
                return
            }
        }
    }

    simulation.startGame();
    // console.log(`pOne landed: ${game.playerOne.board.landedHits}`)
    // console.log(`pOne missed: ${game.playerOne.board.missedHits}`)
    // console.log(`pTwo landed: ${game.playerTwo.board.landedHits}`)
    // console.log(`pTwo missed: ${game.playerTwo.board.missedHits}`)

    const winner = game.checkWhoWon();
    // console.log(`winner: ${winner}`)

    expect(winner == 'Player 1' || winner == 'Player 2').toBeTruthy();
});