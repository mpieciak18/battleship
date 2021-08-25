const randSpot = (otherPlayer) => {
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

    return spot
};

module.exports = randSpot;