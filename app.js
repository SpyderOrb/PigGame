/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//   document - object.

//   querySelector - method that we can use to select elements and values from our webpage to manipulate and change them.
//   It allows you to select stuff exactly the way we do it in CSS. (it only selects the first element that it finds)

//document.querySelector("#current-" + activePlayer).textContent = dice;
//   textContent - text content method to change the text in this element ("#current-"). It can only set plain text (NOT HTML)!

//document.querySelector("#current-" + activePlayer).innerHTML = dice; // setter
//   innerHTML - method to change the HTML in element. html needs to be a string.

//   We can use querySelector method to only read elements from a webpage and store them in some vars.
//let x = document.querySelector("#score-0").textContent; // getter
//console.log(x);

//   Using querySelector to change the CSS of some element

//                          1) Define variables
let scores, roundScore, activePlayer, gamePlaying, winScore, lastDice0, lastDice1, testGit;
init();

//                          2) Make the dice pic invisible and set all values to 0
// document.querySelector(".dice").style.display = "none";

// document.getElementById("score-0").innerHTML = 0;
// document.getElementById("score-1").innerHTML = 0;
// document.getElementById("current-0").innerHTML = 0;
// document.getElementById("current-1").innerHTML = 0;

//                          3) Making it possible to roll the dice
document.querySelector(".btn-roll").addEventListener("click", function () {
    if (gamePlaying) {
        // 1. random number
        let dice0 = Math.floor(Math.random() * 6) + 1;
        let dice1 = Math.floor(Math.random() * 6) + 1;

        // 2. display the result
        let diceDOM1 = document.querySelector(".dice0");
        diceDOM1.style.display = "block";
        diceDOM1.src = "dice-" + dice0 + ".png";

        let diceDOM2 = document.querySelector(".dice1");
        diceDOM2.style.display = "block";
        diceDOM2.src = "dice-" + dice1 + ".png";

        // when currnet value and the last value are both 6
        if ((dice0 === 6 && lastDice0 === 6) || (dice1 === 6 && lastDice1 === 6)) {
            // Player looses his score
            sixDices();
        } else if (dice0 !== 1 && dice1 !== 1) {
            // 3. update the round score IF the number was NOT a 1.
            // add score
            roundScore += dice0 + dice1;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }

        lastDice0 = dice0;
        lastDice1 = dice1;
    }
});
//                          If you roll 6 dices
function sixDices() {
    // roundScore = 0;
    // scores[activePlayer] = roundScore;
    document.querySelector("#score-" + activePlayer).innerHTML = 0; //scores[activePlayer];
    nextPlayer();
}

//                          Input field to set the winning score

//                          4) If dice === 1, pass the turn to another player
function nextPlayer() {
    // next player
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    roundScore = 0;

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    setTimeout("document.querySelector('.dice0').style.display = 'none';", 400);
    setTimeout("document.querySelector('.dice1').style.display = 'none';", 400);
}

//                          5) Making it possible to store the round score
document.querySelector(".btn-hold").addEventListener("click", function () {
    if (gamePlaying) {
        // add current score to global score
        scores[activePlayer] += roundScore;

        // update the UI
        document.querySelector("#score-" + activePlayer).innerHTML = scores[activePlayer];

        // set the new winScore value in input
        let input = document.getElementById("win-score").value;
        if (input) {
            winScore = input;
        } else {
            winScore = 100;
        }

        // Check if player won the game
        if (scores[activePlayer] >= winScore) {
            document.querySelector("#name-" + activePlayer).innerHTML = "Winner!";
            document.querySelector(".dice0").style.display = "none";
            document.querySelector(".dice1").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            // next player
            nextPlayer();
        }
    }
});

document.querySelector(".btn-new").addEventListener("click", init);

//                          6) Make the dice pic invisible and set all values to 0
function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById("win-score").value = ""; // set "Winning score"

    // ANOTHER way to set the new winScore value in input

    // winScore = 100;
    // document.getElementById("win-score").addEventListener("input", function () {
    //     // set the new winScore value in input
    //     winScore = +document.getElementById("win-score").value;
    // });

    document.querySelector(".dice0").style.display = "none";
    document.querySelector(".dice1").style.display = "none";

    document.getElementById("score-0").innerHTML = 0;
    document.getElementById("score-1").innerHTML = 0;
    document.getElementById("current-0").innerHTML = 0;
    document.getElementById("current-1").innerHTML = 0;

    document.getElementById("name-0").innerHTML = "Player 1";
    document.querySelector("#name-1").innerHTML = "Player 2";

    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
}
