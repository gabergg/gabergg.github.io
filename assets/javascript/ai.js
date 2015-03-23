var ai = {

    play: function () {
        var location = this.decideMove();
        $('#' + location).html('O');
    },

    decideMove: function () {

        //Table cleared, game hasn't started yet. Don't try to sneak a move, 'O'!
        if (gameboard.board.data('numTurns') < 1)
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
        else if (this.diagonalForkSetup() && this.check('.side')) {
        }
        //Ai tries to block other fork
        else if ($('#board').data('numTurns') == 3 && this.checkPotentialFork()) {
        }
        else if (this.check('.corner')) {
        }
        //Ai plays in a side
        else this.check('.side');
    },

    tryMove: function (location) {
        if ($('#' + location).html() == '') {
            $('#' + location).html('O');
            gameboard.adjustSetCount('O', location);
            return true;
        }
        return false;
    },

    //try to complete a 3set, or stop X from completing a 3set, if 2 in a row.
    checkWin: function (player) {
        var set = gameboard.hasTwoInRow(player);

        //figure out which row has 2, and finish it.
        if (set) {
            for (var i = 0; i < set.length; i++) {
                if (this.tryMove(set[i]))
                    return true;
            }
        }
        return false;
    },

    //check for the possibility of player creating a fork. logic as follows:
    //  look for X is two separate sets, each with 2 open cells remaining.
    //  find the cell that these sets share and go there.
    //    in order to do this, we create a map to check for dupes in the entire intersection of sets for these X cells,
    //    disregarding those X cells themselves.
    checkPotentialFork: function () {
        var foundSpace = false;
        var possibleBlocks = {};
        $('.cell:contains("X")').each(function () {
            var cellSets = gameboard.numHash[this.id];
            for (var i = 0; i < cellSets.length; i++) {
                if (gameboard.board.data(cellSets[i])['X'] + gameboard.board.data(cellSets[i])['O'] == 1) { //sets with only 1 cell marked
                    for (var j = 0; j < cellSets[i].length; j++) {
                        if ($('#' + cellSets[i][j]).html() != 'X') { //disregard those X cells
                            if (possibleBlocks[cellSets[i][j]] && ai.tryMove(cellSets[i][j])) { //found dupe, take it.
                                foundSpace = true;
                                return false;
                            }
                            else
                                possibleBlocks[cellSets[i][j]] = true;
                        }
                    }
                }
            }

        });
        return foundSpace;
    },

    //try to take the first available corner or side.
    check: function (cornerOrSide) {
        var foundSpace = false;
        $(cornerOrSide).each(function (index, element) {
            if (!foundSpace && ai.tryMove(element.id)) {
                foundSpace = true;
                return false; //break from "each"
            }
        });
        return foundSpace;
    },

    //check if X is in a position to fork across the center, diagonally.
    diagonalForkSetup: function () {
        return (gameboard.board.data('159')['X'] == 2 || gameboard.board.data('357')['X'] == 2) && $('#5').html() == 'O';
    }
}