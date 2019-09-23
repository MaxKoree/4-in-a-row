var playerOne = '<img src="Blackdisc.png">';
var playerTwo = '<img src="Reddisc.png">';
var currentPlayer = playerOne;
var switchPlayer = displayName1;
var displayName1 = "Player one";
var displayName2 = "Player two";
var gameOver = false;

function setPlayers() {
    document.getElementById("playerOne").innerHTML = '<img id="blackDisc" src="Blackdisc.png">' + " =  " + displayName1;
    document.getElementById("playerTwo").innerHTML = '<img id="redDisc" src="Reddisc.png">' + " =   " + displayName2;
}


function switchPLayer() {

    if (currentPlayer === playerOne) {
        currentPlayer = playerTwo;
    } else {
        currentPlayer = playerOne;
    }
}


function processColumn(y) {
    if (gameOver) {
        return
    }
    if (!isColumnFull(y)) {
        for (i = 5; i >= 0; i--) {
            if (isFieldEmpty(i, y)) {
                setField(i, y);
                showCurrentPlayer()

                if (hasWon()) {
                    if (currentPlayer == playerOne) {
                        playerOneHasWon();
                    }
                }

                if (hasWon()) {
                    if (currentPlayer == playerTwo) {
                        playerTwoHasWon();
                    }
                }

                switchPLayer();

                if (isBoardFull()) {
                    gameIsDraw();

                    return;
                }
                return;
            }
        }
    }

}


function isFieldEmpty(x, y) {
    return getField(x, y) != playerOne && getField(x, y) != playerTwo;
}

function getField(x, y) {
    if (x < 0 || y < 0) {
        return ' ';
    }
    return document.getElementById(x + "" + y).innerHTML;
}

function setField(x, y) {
    document.getElementById(x + "" + y).innerHTML = currentPlayer;

}

function clearField(x, y) {
    document.getElementById(x + "" + y).innerHTML = ' ';
    document.getElementById(x + "" +y).style.backgroundColor = "white";
}

function isColumnFull(y) {
    return !isFieldEmpty(0, y);
}

function processField(x, y) {
    return;
}


function hasWon() {
    return winHorizontally() || winVertically() || winDiagonallyLeftToRight() || winDiagonallyRightToLeft();
}

function clearBoard() {
    for (x = 0; x < 6; x++) {
        for (y = 0; y < 7; y++) {
            clearField(x, y);
        }
    }
}

function winHorizontally() {
    for (x = 0; x < 6; x++) {
        for (y = 0; y < 4; y++) {

            if (getField(x, y) == currentPlayer && getField(x, y + 1) == currentPlayer && getField(x, y + 2) == currentPlayer && getField(x, y + 3) == currentPlayer) {
                document.getElementById((x) + "" + (y + 1)).style.backgroundColor = "#167bff";
                document.getElementById((x) + "" + (y + 2)).style.backgroundColor = "#167bff";
                document.getElementById((x) + "" + (y + 3)).style.backgroundColor = "#167bff";
                document.getElementById((x) + "" + (y)).style.backgroundColor = "#167bff";
                return true;
            }
        }
    }
    return false;
}


function winVertically() {
    for (y = 0; y < 6; y++) {
        for (x = 0; x < 3; x++) {

            if (getField(x, y) == currentPlayer && getField(x + 1, y) == currentPlayer && getField(x + 2, y) == currentPlayer && getField(x + 3, y) == currentPlayer) {
                document.getElementById((x + 1) + "" + (y)).style.backgroundColor = "#167bff";
                document.getElementById((x + 2) + "" + (y)).style.backgroundColor = "#167bff";
                document.getElementById((x + 3) + "" + (y)).style.backgroundColor = "#167bff";
                document.getElementById((x) + "" + (y)).style.backgroundColor = "#167bff";
                return true;
            }
        }
    }
    return false;
}

function winDiagonallyLeftToRight() {
    for (x = 0; x < 3; x++) {
        for (y = 0; y < 6; y++) {

            if (getField(x, y) == currentPlayer && getField(x + 1, y + 1) == currentPlayer && getField(x + 2, y + 2) == currentPlayer && getField(x + 3, y + 3) == currentPlayer) {
                document.getElementById((x + 1) + "" + (y + 1)).style.backgroundColor = "#167bff";
                document.getElementById((x + 2) + "" + (y + 2)).style.backgroundColor = "#167bff";
                document.getElementById((x + 3) + "" + (y + 3)).style.backgroundColor = "#167bff";
                document.getElementById((x) + "" + (y)).style.backgroundColor = "#167bff";
                return true;
            }
        }
    }
    return false;
}


function winDiagonallyRightToLeft() {
    for (x = 0; x < 6; x++) {
        for (y = 0; y < 3; y++) {

            if (getField(x, y) == currentPlayer && getField(x - 1, y + 1) == currentPlayer && getField(x - 2, y + 2) == currentPlayer && getField(x - 3, y + 3) == currentPlayer) {
                document.getElementById((x - 1) + "" + (y + 1)).style.backgroundColor = "#167bff";
                document.getElementById((x - 2) + "" + (y + 2)).style.backgroundColor = "#167bff";
                document.getElementById((x - 3) + "" + (y + 3)).style.backgroundColor = "#167bff";
                document.getElementById((x) + "" + (y)).style.backgroundColor = "#167bff";
                return true;
            }
        }
    }
    return false;
}

function startGame() {
    displayName1 = document.getElementById("playerOneInput").value;
    displayName2 = document.getElementById("playerTwoInput").value;
    document.getElementById("p1").innerHTML = "Enter your first move " + displayName1;
    document.getElementById("playerOneInput").setAttribute("disabled", true);
    document.getElementById("playerTwoInput").setAttribute("disabled", true);
    document.getElementById("startGameButton").disabled = true;
    document.getElementById("playerOne").innerHTML = '<img id="redDisc" src="Blackdisc.png">' + " =   " + displayName1;
    document.getElementById("playerTwo").innerHTML = '<img id="blackDisc" src="Reddisc.png">' + " =   " + displayName2;
}

function resetName() {
    document.getElementById("startGameButton").removeAttribute("disabled");
    document.getElementById("playerOneInput").removeAttribute("disabled");
    document.getElementById("playerTwoInput").removeAttribute("disabled");
}

function resetGame() {
    switchPLayer();
    clearBoard();
    document.getElementById("playerOneInput").setAttribute("disabled", true);
    document.getElementById("playerTwoInput").setAttribute("disabled", true);
    document.getElementById("startGameButton").disabled = true;
    document.getElementById("p1").style.fontSize = "25px";
    showCurrentPlayer();
    processColumn(y);
    gameOver = false
}

function playerOneHasWon() {
    document.getElementById("p1").innerHTML = "Congratulations " + displayName1 + " has won";
    document.getElementById("p1").style.fontSize = "40px";
    gameOver = true;
}


function playerTwoHasWon() {
    document.getElementById("p1").innerHTML = "Congratulations " + displayName2 + " has won";
    document.getElementById("p1").style.fontSize = "40px";
    gameOver = true
}

function gameIsDraw() {
    document.getElementById("p1").innerHTML = "I'ts a draw";
    document.getElementById("p1").style.fontSize = "40px";
    gameOver = true
}

function isBoardFull() {
    for (y = 0; y < 6; y++) {
        if (getField(x, y) != isFieldEmpty() && getField(x, y + 1) != isFieldEmpty() && getField(x, y + 2) != isFieldEmpty() && getField(x, y + 3) != isFieldEmpty() && getField(x, y + 4) != isFieldEmpty() && getField(x, y + 5) != isFieldEmpty()) {
            gameIsDraw()
        }
    }
}

function showCurrentPlayer() {
    if (currentPlayer == playerOne) {
        document.getElementById("p1").innerHTML = "Enter your move " + displayName2;
    }
    else {
        document.getElementById("p1").innerHTML = "Enter your move " + displayName1;

    }

}
