var ai = {

    play: function () {
        var location = this.decideMove();
        $('#' + location).html('O');
    },

    decideMove: function () {

        //Table cleared, game hasn't started yet. Don't try to sneak a move, 'O'!
        if ($('#board').data('numTurns') < 1)
            return;
        //Try to take the middle. This won't ever succeed after the first exchange.
        if (this.tryMove('5')) {
        }
        //Ai tries to finish for the win
        else if (this.checkWin('O')) {
        }
        //Ai tries to block person's win
        else if (this.checkWin('X')) {
        }
        //Ai tries to block corner fork
        else if (($('#board').data('159')['X'] == 2 || $('#board').data('357')['X'] == 2) && $('#5').html() == 'O' && this.check('.side')) {
        }
        //Ai tries to block other fork
        else if ($('#board').data('numTurns') == 3 && this.checkPotentialFork()) {
        }
        else if (this.check('.corner')) {
        }
        //Ai plays in a side
        else {
            this.check('.side');
        }

    },

    tryMove: function (location) {
        if ($('#' + location).html() == '') {
            $('#' + location).html('O');
            board.adjustSetCount('O', location);
            return true;
        }
        return false;
    },

    checkWin: function (player) {
        var set = board.hasTwoInRow(player);

        //figure out which row has 2, and finish it.
        if (set) {
            for (var i = 0; i < set.length; i++) {
                if (this.tryMove(set[i]))
                    return true;
            }
        }
        return false;
    },

    checkPotentialFork: function () {
        var foundSpace = false;
        var possibleBlocks = {};
        $('.cell:contains("X")').each(function () {
            var idSets = board.numHash[this.id];
            for (var i = 0; i < idSets.length; i++) {
                if ($('#board').data(idSets[i])['X'] + $('#board').data(idSets[i])['O'] == 1) {
                    for (var j = 0; j < idSets[i].length; j++) {
                        if ($('#' + idSets[i][j]).html() != 'X') {
                            if (possibleBlocks[idSets[i][j]] && ai.tryMove(idSets[i][j])) {
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
    },

    check: function (cornerOrSide) {
        var foundSpace = false;
        //take the first available corner or side.
        $(cornerOrSide).each(function (index, element) {
            if (!foundSpace && ai.tryMove(element.id)) {
                foundSpace = true;
                return false; //break from "each"
            }
        });
        return foundSpace;
    }
}