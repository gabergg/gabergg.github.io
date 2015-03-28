$(function () {
    window.test = new Test($('body'));
});

function Test(documentBody) {
    this.body = documentBody;
}

//stop alert windows, instead pipe to data so we can loop through games and check outcomes.
Test.prototype.alertToConsole = function () {
    window.alert = function (text) {
        test.body.data("alert", text);
    }
}

//return alerts to normal for regular gameplay to continue.
Test.prototype.stopConsoleAlert = function () {
    delete window.alert;
}

//run through all possible game outcomes given this particular ai, check for any player wins.
Test.prototype.testPlayerWins = function () {
    this.alertToConsole();
    var possiblePaths = [];
    var passed = true;

    $('.cell:empty').each(function () {
        possiblePaths.push(this.id);
    });

    while (possiblePaths.length > 0) {
        var len = possiblePaths.length;
        for (var i = 0; i < len; i++) {
            this.body.data("alert", ""); //will store win message here
            for (var j = 0; j < possiblePaths[i].length; j++) {
                $('#' + possiblePaths[i][j]).trigger('click');
                if (this.body.data("alert") == "You win!") {
                    console.error("Test Failed!", possiblePaths[i]); //player was able to win, log winning play
                    passed = false;
                }
            }
            if (!this.body.data("alert")) {
                $('.cell:empty').each(function () {
                    possiblePaths.push(possiblePaths[i] + this.id); //if game isn't over, push all empty squares
                });
            }
            gameboard.reset();
        }
        possiblePaths.splice(0, len); //remove finished / shorter paths. 1 2 3... -> 12 13 14...21 23 24...
    }

    this.stopConsoleAlert();
    return passed ? "Player can't win!" : "Noo! Player can win!";
}