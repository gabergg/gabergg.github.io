var testing = {

    alertToConsole: function () {
        window.alert = function (text) {
            $('body').data("alert", text);
        }
    },

    stopConsoleAlert: function () {
        delete window.alert;
    },

    testPlayerWins: function () {
        this.alertToConsole();
        var possiblePaths = [];

        $('.cell:empty').each(function () {
            possiblePaths.push(this.id);
        });

        while (possiblePaths.length > 0) {
            len = possiblePaths.length;
            for (var i = 0; i < len; i++) {
                $('body').data("alert", "");
                for (var j = 0; j < possiblePaths[i].length; j++) {
                    $('#' + possiblePaths[i][j]).trigger('click');
                    if ($('body').data("alert") == "You win!") {
                        console.error("Test Failed!", possiblePaths[i]);
                    }
                }
                if (!$('body').data("alert")) {
                    $('.cell:empty').each(function () {
                        possiblePaths.push(possiblePaths[i] + this.id);
                    });
                }
                board.reset();
            }
            possiblePaths.splice(0, len);
        }

        this.stopConsoleAlert();
    }
}