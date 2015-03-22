function aiPlay() {
    var location = decideMove();
    $('#' + location).html('O');
}

function decideMove() {


    //Table cleared, game hasn't started yet. Don't try to sneak a move, 'O'!
    if ($('#board').data('numTurns') < 1)
        return;
    //Try to take the middle. This won't ever succeed after the first exchange.
    if (tryMove('5')) {
    }
    //Ai tries to finish for the win
    else if (this.checkWin('O')) {
    }
    //Ai tries to block person's win
    else if (this.checkWin('X')) {
    }
    //Ai tries to block corner fork
    else if (($('#board').data('159').X == 2 || $('#board').data('357').X == 2) && $('#5').html() == 'O' && this.check('.side')) {
     }
    //Ai tries to block other fork
    else if ($('#board').data('numTurns') == 3 && checkPotentialFork()) {
    }
    else if (this.check('.corner')) {
    }
    //Ai plays in a side
    else {
        this.check('.side');
    }

}

function tryMove(location) {
    if ($('#' + location).html() == '') {
        $('#' + location).html('O');
        adjustSetCount('O', location);
        return true;
    }
    return false;
}

function checkWin(player) {
    var set = hasTwoInRow(player);

    //figure out which row has 2, and finish it.
    if (set) {
        for (var i = 0; i < set.length; i++) {
            if (tryMove(set[i]))
                return true;
        }
    }
    return false;
}

function checkPotentialFork() {
    var foundSpace = false;
    var possibleBlocks = {};
    $('.cell:contains("X")').each(function () {
        var idSets = numHash[this.id];
        for (var i = 0; i < idSets.length; i++) {
            if ($('#board').data(idSets[i]).X + $('#board').data(idSets[i]).O == 1) {
                for (var j = 0; j < idSets[i].length; j++) {
                    if ($('#' + idSets[i][j]).html() != 'X') {
                        if (possibleBlocks[idSets[i][j]] && tryMove(idSets[i][j])) {
                            foundSpace = true;
                            return false;
                        }
                        else
                            possibleBlocks[idSets[i][j]] = true;
                    }
                }
            }
        }

    });
    return foundSpace;
}

function check(cornerOrSide) {
    var foundSpace = false;
    //take the first available corner or side.
    $(cornerOrSide).each(function (index, element) {
        if (!foundSpace && tryMove(element.id)) {
            foundSpace = true;
            return false; //break from "each"
        }
    });
    return foundSpace;
}