'use strict';

// Declare variables;

var board = ['', '', '', '', '', '', '', '', ''];
var playerTime = 0;
var symbols = ['o', 'x'];
var gameOver = false;

var winner = ["Dogs", "Cats"];

var winStates = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

localStorage.setItem("dogScore", 0);
localStorage.setItem("catScore", 0);

function handleMove(position) {

    if (gameOver) {
        return;
    }

    if (board[position] == '') {
        board[position] = symbols[playerTime];

        gameOver = isWin();

        if (!gameOver) {
            playerTime = playerTime == 0 ? 1 : 0;
        }

        return gameOver;
    }
}

function isWin() {

    for (var i = 0; i < winStates.length; i++) {

        var seq = winStates[i];

        var pos1 = seq[0];
        var pos2 = seq[1];
        var pos3 = seq[2];

        if (board[pos1] == board[pos2] && board[pos1] == board[pos3] && board[pos1] != '') {
            return true;
        }
    }
    return false;
}