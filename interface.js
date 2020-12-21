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

    if (handleMove(position)) {
        
    if(playerTime === 0){
        var dogScoreVar = localStorage.getItem("dogScore");
        dogScoreVar++
        localStorage.setItem("dogScore", dogScoreVar);
    } else {
        var catScoreVar = localStorage.getItem("catScore");
        catScoreVar++
        localStorage.setItem("catScore", catScoreVar);       
    }

    let titleScore = document.getElementById("titleScore");
    titleScore.innerText = `Dogs ${localStorage.getItem("dogScore")} x ${localStorage.getItem("catScore")} Cats`;

        setTimeout(function () {
            var gameOverScreen = document.getElementsByClassName("gameOverScreen")[0];
            gameOverScreen.style.display = "block";
            var winnerDeclaration = document.getElementById("winnerDeclaration");
            winnerDeclaration.innerText += '' + winner[playerTime];
        }, 10);
    };
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
    winnerDeclaration.innerHTML = "The winner is:</br>";

    board = ['', '', '', '', '', '', '', '', ''];
    playerTime = 0;
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