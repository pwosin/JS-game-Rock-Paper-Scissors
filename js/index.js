'use strict';
(function() {
// zmienne
    const startGame = document.getElementById("startGame");
    const moveRock = document.getElementById("rock");
    const movePaper = document.getElementById("paper");
    const moveScirssors = document.getElementById("scirssors");
    const result = document.getElementById("result");
    const resultBoard = document.getElementById("resultBoard");
    const resultBoardHeader = document.getElementById("resultBoardHeader");
    const scoreBoard = document.getElementById("scoreBoard");
    const score = document.getElementById("score");
    const summary = document.getElementById("summary");
    const playButtons = document.getElementById("buttons");
    let gameStatus = 'notStarted'; // notStarted inProgres finished
    let computerMove = '';
    let playerMove ='';
    let playerStatus = '';
    let gameStats = {
        playerResult: 0,
        computerResult: 0,
        playerName: '',
        gameNumber: 0,
        maxGames: 0
    }
 
//nasłuch przycisków;
startGame.addEventListener('click', newGame);
moveRock.addEventListener('click', function() { game('Rock') });
movePaper.addEventListener('click', function() { game('Paper') });
moveScirssors.addEventListener('click', function() { game('Scissors') });

// start nowej gry
function newGame() {
    clearBoards(); //czyszczenie wyników
    gameStats.playerName = prompt('Please enter your name', 'John');
    gameStats.maxGames = prompt('How many times you want to play?', '10');
    gameStats.playerResult = 0;
    gameStats.computerResult = 0;
    gameStats.gameNumber = 0;
    gameStatus = 'inProgres';
    displayBorads();
}
//funkcja wyświetlająca/uktywające elementy w zależności od statusu gry
function displayBorads() {
    switch(gameStatus) {
      case 'inProgres':
        resultBoard.style.display = 'block';
        scoreBoard.style.display = 'block';
        summary.style.display = 'none';
        playButtons.style.display = 'block';
        resultBoardHeader.style.display = 'block'
        result.style.display = 'block'
        break;
      case 'finished':
        resultBoard.style.display = 'block';
        scoreBoard.style.display = 'block';
        summary.style.display = 'block';
        playButtons.style.display = 'none';
        break;
      case 'notStarted':  	
        resultBoard.style.display = 'none';
        scoreBoard.style.display = 'none';
        summary.style.display = 'none';
        playButtons.style.display = 'none';
      default:
      }
  }
  displayBorads();
  
  function game(playerMove){
    computerMove = getComputerMove();
    resultBoardHeader.innerHTML = '   '+gameStats.playerName +' -- computer';
    result.innerHTML = '0 -- 0';
    gameWinner(playerMove, computerMove);
    gameLimit();
    displayBorads();
  }
  //funkcja sprawdzajaca wynik rozgrywki
  function gameWinner(playerMove, computerMove) {
    playerStatus = '';
    if (playerMove === computerMove) {
        playerStatus = 'Tie!';  
    } 
    else if (
		(playerMove === 'Rock' &&  computerMove === 'Scissors') ||
		(playerMove === 'Scissors' &&  computerMove === 'Paper') ||
		(playerMove === 'Paper' &&  computerMove === 'Rock')) {
        playerStatus = 'Win!';
        gameStats.playerResult++;
    }
    else if ((computerMove === 'Rock' &&  playerMove === 'Scissors') ||
    (computerMove === 'Scissors' &&  playerMove === 'Paper') ||
    (computerMove === 'Paper' &&  playerMove === 'Rock')){
        playerStatus = 'Lost!';
        gameStats.computerResult++;
    }
    gameStats.gameNumber++;
    write(playerStatus, playerMove, computerMove);
}

    function write(status, playerMove, computerMove){
        result.innerHTML = + gameStats.playerResult + ' -- ' + gameStats.computerResult + '<br>You play ' + gameStats.maxGames + ' games<br>';
        score.insertAdjacentHTML('afterbegin', status + ' You pick ' + playerMove + ' computer pick ' + computerMove + '<br>');
    }

// funkcja sprawdzająca czy osiągnięto limit gier
    function gameLimit(){
        if(gameStats.gameNumber >= gameStats.maxGames){
            gameStatus = 'finished';
            if(gameStats.playerResult > gameStats.computerResult){
                summary.innerHTML = ''+gameStats.playerName + " is the winner!";
                summary.classList.add('text-success');
            }
            else if(gameStats.playerResult === gameStats.computerResult) {
                summary.innerHTML = "It's a TIE!";
                summary.classList.add('text-warning');
            }
            else{
                summary.innerHTML = "Computer is the Winner!";
                summary.classList.add('text-danger');
            }
        }
        console.log('play');
        console.log(gameStats.playerResult);
        console.log('comp');
        console.log(gameStats.computerResult);
    }
        
  //funkcja losująca ruch komputera
    function getComputerMove() {
    let move = Math.random();
    move = move * 10 % 3 + 1;
    move = Math.round(move);
    switch (move) {
        case 1:
            return 'Rock';

        case 2:
            return 'Paper';

        default:
            return 'Scissors';
    }
}
//funkcja czyszcząca tablice wyników
function clearBoards() {
    result.innerHTML = '';
    resultBoardHeader.innerHTML = '';
    score.innerHTML = '';
    summary.innerHTML ='';
    summary.className = 'h3';
}
})();