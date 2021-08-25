const createPlayer = require('../scripts/player');

const createBot = () => ({
    player: createPlayer(),
    makePlay(otherPlayer) {
        let spot = '';
        
        while (spot == '') {
            const possiblePlay = Math.ceil(Math.random() * 100);
            const landedHits = otherPlayer.gameboard.landedHits;
            const missedHits = otherPlayer.gameboard.missedHits;
            if (landedHits.includes(possiblePlay) || missedHits.includes(possiblePlay)) {
                continue;
            } else {
                spot = possiblePlay;
            };
        };

        this.player.attack(otherPlayer, spot);
    }
});

module.exports = createBot;