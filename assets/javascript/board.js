var board = {

//Will maintain counts of each player's marks in each possible set of 3.
//Stored in $('#board').data
    setsOfThree: ['123', '456', '789', '147', '258', '369', '159', '357'], //all sets of 3
    numHash: {}, //to be a map of all sets in which a cell are included. e.g. 1-> 123, 147, 159, 2 -> 123, 258

    //clear board and all game-specific data
    reset: function () {

        $('.cell').html('');
        for (var i = 0; i < this.setsOfThree.length; i++) {
            $('#board').data(this.setsOfThree[i], {'X': 0, 'O': 0});
        }
        $('#board').data('numTurns', 0);

    },

    adjustSetCount: function (player, cell) {
        //mapping increased count to each of the 3-sets that include played cell.
        for (var i = 0; i < this.numHash[cell].length; i++) {
            if (player == 'X') {
                $('#board').data(this.numHash[cell][i])['X']++;
            }
            else {
                $('#board').data(this.numHash[cell][i])['O']++;
            }
        }
        $('#board').data().numTurns++;
        this.checkGameStatus();
    },

    //check for game-ending setups, e.g. two in a row with open third.
    hasTwoInRow: function (player) {
        for (var i = 0; i < this.setsOfThree.length; i++) {
            var currentSet = $('#board').data(this.setsOfThree[i]);

            if (player == 'X') {
                //X has 2 in a 3-set, with the remaining cell open.
                if (currentSet['X'] == 2 && currentSet['O'] == 0)
                    return this.setsOfThree[i];
            } else {
                if (currentSet['O'] == 2 && currentSet['X'] == 0)
                    return this.setsOfThree[i];
            }

        }
        return null;
    },

    //check if any of our 8 sets are completed by a single player or all squares are full
    checkGameStatus: function () {
        for (var i = 0; i < this.setsOfThree.length; i++) {
            var currentSet = $('#board').data(this.setsOfThree[i]);

            if (currentSet['X'] == 3) {
                alert("You win!");
                this.reset();
            }
            else if (currentSet['O'] == 3) {
                alert("Uh oh! Computer wins!");
                this.reset();
            }

        }

        if ($('#board').data('numTurns') == 9) {
            alert("Tie Game!");
            this.reset();
        }

    },

    //set up a map of all sets in which a cell are included. e.g. 1-> 123, 147, 159, 2 -> 123, 258
    createNumHash: function () {

        for (var i = 1; i < 10; i++) {
            this.numHash[i] = [];
            for (var j = 0; j < this.setsOfThree.length; j++) {
                if (this.setsOfThree[j].indexOf(i) > -1)
                    this.numHash[i].push(this.setsOfThree[j]);
            }
        }
    }
}

$(function () {
    board.createNumHash();
    board.reset();
    $('.cell').click(function (event) {

        if ($(this).html() == '') {
            $(this).html('X');
            board.adjustSetCount('X', event.target.id);
            ai.play();
        }
    });
});

