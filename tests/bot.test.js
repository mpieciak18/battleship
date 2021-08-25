const createBot = require('../scripts/bot');
const createPlayer = require('../scripts/player');

test('Create bot & other player, have bot attack player, and confirm hit landed somewhere on the board', () => {
    const bot = createBot();

    const player = createPlayer();
    player.initGameboard();
    player.gameboard.initShip(0, 5, [5, 15, 25, 35, 45]);

    bot.makePlay(player);

    expect(
        player.gameboard.landedHits.length == 1 
        || player.gameboard.missedHits.length == 1
    ).toBeTruthy();
});