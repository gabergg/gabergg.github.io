var setsOfThree = ['123', '456', '789', '147', '258', '369', '159', '357'];

$('.cell').click(function (event) {

    if ($(this).html() == '') {
        $(this).html('X');
        adjustSetCount('X', event.target.id);
        aiPlay();
    }
});

function resetBoard() {

    $('.cell').html('');
    for (var i = 0; i < setsOfThree.length; i++) {
        $('#board').data(setsOfThree[i], {'X': 0, 'O': 0});
    }
    $('#board').data('numTurns', 0);

}

$(function init() {
    resetBoard();
});

function hasTwoInRow(player) {
    for (var i = 0; i < setsOfThree.length; i++) {

        if (player == 'X') {
            if ($('#board').data(setsOfThree[i]).X == 2 && $('#board').data(setsOfThree[i]).O == 0)
                return setsOfThree[i];
        } else {
            if ($('#board').data(setsOfThree[i]).O == 2 && $('#board').data(setsOfThree[i]).X == 0)
                return setsOfThree[i];
        }

    }
    return null;
}

function adjustSetCount(player, cell) {
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

function checkGameStatus() {
    for (var i = 0; i < setsOfThree.length; i++) {

        if ($('#board').data(setsOfThree[i]).X == 3) {
            alert("You win!");
            resetBoard();
        }
        else if ($('#board').data(setsOfThree[i]).O == 3) {
            alert("Computer wins!");
            resetBoard();
        }

    }

    if ($('#board').data('numTurns') == 9) {
        alert("Tie Game!");
        resetBoard();
    }

}