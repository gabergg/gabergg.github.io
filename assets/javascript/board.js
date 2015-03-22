//Will maintain counts of each player's marks in each possible set of 3.
//Stored in $('#board').data
var setsOfThree = ['123', '456', '789', '147', '258', '369', '159', '357']; //all sets of 3
var numHash = {};

$(function init() {
    resetBoard();
});

function resetBoard() {

    $('.cell').html('');
    for (var i = 0; i < setsOfThree.length; i++) {
        $('#board').data(setsOfThree[i], {'X': 0, 'O': 0});
    }
    $('#board').data('numTurns', 0);

}

$('.cell').click(function (event) {

    if ($(this).html() == '') {
        $(this).html('X');
        adjustSetCount('X', event.target.id);
        aiPlay();
    }
});

function adjustSetCount(player, cell) {
    //mapping increased count to each of the 3-sets that include played cell.
    for (var i = 0; i < setsOfThree.length; i++) {
        if (setsOfThree[i].indexOf(cell) > -1) {
            if (player == 'X') {
                $('#board').data(setsOfThree[i]).X++;
            }
            else {
                $('#board').data(setsOfThree[i]).O++;
            }
        }
    }
    $('#board').data().numTurns++;
    checkGameStatus();
}

function hasTwoInRow(player) {
    for (var i = 0; i < setsOfThree.length; i++) {

        if (player == 'X') {
            //X has 2 in a 3-set, with the remaining cell open.
            if ($('#board').data(setsOfThree[i]).X == 2 && $('#board').data(setsOfThree[i]).O == 0)
                return setsOfThree[i];
        } else {
            if ($('#board').data(setsOfThree[i]).O == 2 && $('#board').data(setsOfThree[i]).X == 0)
                return setsOfThree[i];
        }

    }
    return null;
}

function checkGameStatus() {
    for (var i = 0; i < setsOfThree.length; i++) {

        if ($('#board').data(setsOfThree[i]).X == 3) {
            alert("You win!");
            resetBoard();
        }
        else if ($('#board').data(setsOfThree[i]).O == 3) {
            alert("Uh oh! Computer wins!");
            resetBoard();
        }

    }

    if ($('#board').data('numTurns') == 9) {
        alert("Tie Game!");
        resetBoard();
    }

}

$(function createNumHash() {

    for (var i = 1; i < 10; i++) {
        numHash[i] = [];
        for (var j = 0; j < setsOfThree.length; j++) {
            if (setsOfThree[j].indexOf(i) > -1)
                numHash[i].push(setsOfThree[j]);
        }
    }
});