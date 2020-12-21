'use strict';

document.addEventListener('DOMContentLoaded', function () {

    var squares = document.querySelectorAll(".square");

    squares.forEach(function (square) {
        square.addEventListener('click', handleClick);
    });
});

function handleClick(event) {

    var square = event.target;
    var position = square.id;

    //Alguém ganhou?
    if (handleMove(position)) {

        //Atualize o score
        if (playerTime === 0) {
            var dogScoreVar = localStorage.getItem("dogScore");
            dogScoreVar++;
            localStorage.setItem("dogScore", dogScoreVar);
        } else {
            var catScoreVar = localStorage.getItem("catScore");
            catScoreVar++;
            localStorage.setItem("catScore", catScoreVar);
        }
        var titleScore = document.getElementById("titleScore");
        titleScore.innerText = 'Dogs ' + localStorage.getItem("dogScore") + ' x ' + localStorage.getItem("catScore") + ' Cats';

        //Mostre a tela de GameOver
        setTimeout(function () {
            var gameOverScreen = document.getElementsByClassName("gameOverScreen")[0];
            gameOverScreen.style.display = "flex";
            var winnerDeclaration = document.getElementById("winnerDeclaration");
            winnerDeclaration.innerHTML = winner[playerTime] + ' won!<br>Now the other pet goes first.';
        }, 10);
    }

    updateSquare(position);
}

function updateSquare(position) {

    var square = document.getElementById(position.toString());
    var symbol = board[position];

    square.innerHTML = '<div id=\'' + symbol + '\'></div>';
}

function resetGame() {
    var gameOverScreen = document.getElementsByClassName("gameOverScreen")[0];
    gameOverScreen.style.display = "none";
    var winnerDeclaration = document.getElementById("winnerDeclaration");
    winnerDeclaration.innerHTML = "";

    board = ['', '', '', '', '', '', '', '', ''];
    if (playerTime == 0) {
        playerTime = 1;
    } else {
        playerTime = 0;
    };
    gameOver = false;

    var squares = document.querySelectorAll(".square");

    squares.forEach(function (square) {
        var position = square.id;
        var symbol = board[position];

        if (symbol == '') {
            square.innerHTML = '<div id=\'' + symbol + '\'></div>';
        }
    });
};