'use strict';

// Movi a "importação" das tags para cima 
var squares = document.querySelectorAll(".square");
let titleScore = document.getElementById("titleScore");
// O ideal é usar let e não var, pesquisando o Google vc descobre o pq e acho que o Igor fala em um momento do curso.

// Vai exutar quando o HTML carregar
document.addEventListener('DOMContentLoaded', function () {

    squares.forEach(function (square) {
        square.addEventListener('click', handleClick);
    });

    // Aqui precisamos verificar se existe um score salvo e inserir na pagina
    let dogScoreVar = localStorage.getItem("dogScore");
    let catScoreVar = localStorage.getItem("catScore");

    // Se dog ou cat foram undefined eu seto 0 no localstorage pra não dar erro no código lá na frente.
    if (!dogScoreVar || !catScoreVar) {
        localStorage.setItem("dogScore", 0);
        localStorage.setItem("catScore", 0);
    } else {
        setarScore(dogScoreVar, catScoreVar)
    }
});

// Vou criar uma função que seta o score porque vou usar em dois lugares
const setarScore = (dogScore, catScore) => {
    titleScore.innerText = `Dogs ${dogScore} x ${catScore} Cats`;
    // Com Templete String fica mais elegante, pesquisa no Google: Templete String MDN
}

function handleClick(event) {

    var square = event.target;
    var position = square.id;

    let dogScoreVar = localStorage.getItem("dogScore");
    let catScoreVar = localStorage.getItem("catScore");

    //Alguém ganhou?
    if (handleMove(position)) {

        //Atualize o score
        if (playerTime === 0) {
            dogScoreVar++;
            localStorage.setItem("dogScore", dogScoreVar);
        } else {
            catScoreVar++;
            localStorage.setItem("catScore", catScoreVar);
        }

        setarScore(dogScoreVar, catScoreVar)
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