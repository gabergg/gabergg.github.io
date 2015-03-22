var board = {

//Will maintain counts of each player's marks in each possible set of 3.
//Stored in $('#board').data
    setsOfThree: ['123', '456', '789', '147', '258', '369', '159', '357'], //all sets of 3
    numHash: {},

    reset: function () {

        $('.cell').html('');
        for (var i = 0; i < this.setsOfThree.length; i++) {
            $('#board').data(this.setsOfThree[i], {'X': 0, 'O': 0});
        }
        $('#board').data('numTurns', 0);

    },

    adjustSetCount: function (player, cell) {
        //mapping increased count to each of the 3-sets that include played cell.
        for (var i = 0; i < this.setsOfThree.length; i++) {
            if (this.setsOfThree[i].indexOf(cell) > -1) {
                if (player == 'X') {
                    $('#board').data(this.setsOfThree[i])['X']++;
                }
                else {
                    $('#board').data(this.setsOfThree[i])['O']++;
                }
            }
        }
        $('#board').data().numTurns++;
        this.checkGameStatus();
    },

    hasTwoInRow: function (player) {
        for (var i = 0; i < this.setsOfThree.length; i++) {

            if (player == 'X') {
                //X has 2 in a 3-set, with the remaining cell open.
                if ($('#board').data(this.setsOfThree[i])['X'] == 2 && $('#board').data(this.setsOfThree[i])['O'] == 0)
                    return this.setsOfThree[i];
            } else {
                if ($('#board').data(this.setsOfThree[i])['O'] == 2 && $('#board').data(this.setsOfThree[i])['X'] == 0)
                    return this.setsOfThree[i];
            }

        }
        return null;
    },

    checkGameStatus: function () {
        for (var i = 0; i < this.setsOfThree.length; i++) {

            if ($('#board').data(this.setsOfThree[i])['X'] == 3) {
                alert("You win!");
                this.reset();
            }
            else if ($('#board').data(this.setsOfThree[i])['O'] == 3) {
                alert("Uh oh! Computer wins!");
                this.reset();
            }

        }

        if ($('#board').data('numTurns') == 9) {
            alert("Tie Game!");
            this.reset();
        }

    },

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

