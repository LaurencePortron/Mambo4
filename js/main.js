// Gestion de l'affichage des différentes vies

const saveButton = document.querySelector('.save');
const scoreButton = document.querySelector('.score-button');
const playBody = document.querySelector('.play-body');
const settingsBody = document.querySelector('.settings-body');
const scoresBody = document.querySelector('.scores-body');

saveButton.addEventListener('click', function () {
  playBody.style.display = 'block';
  settingsBody.style.display = 'none';
});

scoreButton.addEventListener('click', function () {
  scoresBody.style.display = 'block';
  playBody.style.display = 'none';
});

const imageSoundOnOff = document.querySelector('.sound-image');
imageSoundOnOff.addEventListener('click', function () {
  if (imageSoundOnOff.getAttribute('src') == '../images/imgmute.png') {
    imageSoundOnOff.setAttribute('src', '../images/imgmusic.jpg');
    soundActive = true;
  } else {
    imageSoundOnOff.setAttribute('src', '../images/imgmute.png');
    soundActive = false;
  }
});
//Gestion du mode increase speed

let increaseSpeed = false;
let speedInterval = 800;

const buttonIncreaseSpeed = document.querySelector('#switch-speed');
buttonIncreaseSpeed.addEventListener('change', function () {
  if (increaseSpeed == false) {
    increaseSpeed = true;
    speedInterval = 400;
  } else {
    increaseSpeed = false;
    speedInterval = 800;
  }
});

// Variables

let order = []; // on va stocker dans cette variable la séquence de 20 couleurs
let playerOrder = []; // liste des couleurs sur lesquelles le joueur a cliqué
let nbCompTurn; // nombre de tour qu'a joué l'ordinateur
let nbUserTurn; // tour actuel
let good; // retourne true ou false si le joueur clique sur la bonne ou la mauvaise couleur
let compTurn; // true si c'est au tour de l'ordinateur
let interval;
let win; // si true, le joueur a gagné
let soundActive = true;
let scoreValue = 0;
let scoresTable = JSON.parse(localStorage.getItem('scoresTable')) || [];

const score = document.querySelector('.score');
const carreRouge = document.querySelector('.carreRouge');
const carreBleu = document.querySelector('.carreBleu');
const carreJaune = document.querySelector('.carreJaune');
const carreVert = document.querySelector('.carreVert');
const message = document.querySelector('.message');
const startButton = document.querySelector('.start');
const scoresCasesTable = document.querySelector('.scores_table');
const highestScoreCase = document.querySelector('.highscore_case');

const rougeSound = document.querySelector('.do');
const vertSound = document.querySelector('.re');
const bleuSound = document.querySelector('.mi');
const jauneSound = document.querySelector('.si');

// création d'un écouteur, déclenchant le jeu par un clic sur le bouton start

startButton.addEventListener('click', (event) => {
  play();
});

// fonction permettant d'initialiser le jeu

function play() {
  win = false; // en cas de nouveau jeu après une victoire, on remet la variable win à fausse
  order = []; // idem, on vide le tableau order
  playerOrder = []; // on vide également le tableau playerOrder
  nbCompTurn = 0; // l'ordinateur n'a pas joué, donc variable = 0
  interval = 0;
  nbUserTurn = 1; // on initialise le nb de tours de joueurs à 1
  score.innerHTML = 'SCORE : 0'; // on remet le score à 0
  good = true; // on remet good à true si le joueur avait fait une erreur

  for (let i = 0; i < 5; i++) {
    // cette boucle va créer un tableau de 20 chiffres compris entre 1 et 4
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  compTurn = true; // on indique que c'est le tour de l'ordinateur
  interval = setInterval(gameTurn, speedInterval);
}
// cette foncton permet de créer le tour de jeu

function gameTurn() {
  if (nbCompTurn == nbUserTurn) {
    // on compare le nb de tours de l'utilisateur à celui de l'ordinateur
    clearInterval(interval); // on stoppe la fonction
    compTurn = false; // on indique que ce n'est pas le tour de l'ordinateur
    clearColor(); // on éteint les couleurs
  }

  if (compTurn) {
    // on vérifie que ce soit le tour de l'ordinateur
    clearColor(); // on éteint les couleurs
    setTimeout(() => {
      if (order[nbCompTurn] == 1) rouge(); // si dans la séquence, le 1er chiffre est un 1 on allume le rouge au bout de 200mS
      if (order[nbCompTurn] == 2) bleu();
      if (order[nbCompTurn] == 3) jaune();
      if (order[nbCompTurn] == 4) vert();
      nbCompTurn++; // on augmente le nombre de tour de l'ordinateur
    }, 200);
  }
}

function rouge() {
  carreRouge.style.opacity = '0.7';
  rougeSound.play();
}

function bleu() {
  carreBleu.style.opacity = '0.7';
  bleuSound.play();
}

function jaune() {
  carreJaune.style.opacity = '0.7';
  jauneSound.play();
}

function vert() {
  carreVert.style.opacity = '0.7';
  vertSound.play();
}

function clearColor() {
  carreVert.style.opacity = '1';
  carreJaune.style.opacity = '1';
  carreBleu.style.opacity = '1';
  carreRouge.style.opacity = '1';
}

carreRouge.addEventListener('click', (event) => {
  playerOrder.push(1);
  check();
  rouge();
  rougeSound.play();
  setTimeout(() => {
    clearColor();
  }, 300);
});

carreBleu.addEventListener('click', (event) => {
  playerOrder.push(2);
  check();
  bleu();
  bleuSound.play();
  setTimeout(() => {
    clearColor();
  }, 300);
});

carreJaune.addEventListener('click', (event) => {
  playerOrder.push(3);
  check();
  jaune();
  jauneSound.play();
  setTimeout(() => {
    clearColor();
  }, 300);
});

carreVert.addEventListener('click', (event) => {
  playerOrder.push(4);
  check();
  vert();
  vertSound.play();
  setTimeout(() => {
    clearColor();
  }, 300);
});

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) {
    good = false;
  }

  if (playerOrder.length == 5 && good) {
    winGame();
  }

  if (good == false) {
    addScoreToTable();
    message.innerHTML = 'YOU LOOSE, TRY AGAIN !';
    setTimeout(() => {
      message.innerHTML = '';
      clearColor();
      play();
    }, 800);
  }

  if (nbUserTurn == playerOrder.length && good && !win) {
    nbUserTurn++;
    playerOrder = [];
    compTurn = true;
    nbCompTurn = 0;
    scoreValue = nbUserTurn * 10 - 10;
    score.innerHTML = 'SCORE : ' + scoreValue;
    interval = setInterval(gameTurn, speedInterval);
  }
}

function winGame() {
  addScoreToTable();
  message.innerHTML = 'YOU WIN !';
  setTimeout(() => {
    message.innerHTML = '';
  }, 2000);
  win = true;
}

// When user has won or loose, we add the score to the table
function addScoreToTable() {
  scoresTable.unshift({ user: 'todo', scoreValue });
  scoresTable.slice(5);

  scoresTable.sort((a, b) => {
    return b.scoreValue - a.scoreValue;
  });

  localStorage.setItem('scoresTable', JSON.stringify(scoresTable));

  // New table, so we update the html
  showScores();
}

// Update the html with scores
function showScores() {
  const highestScore = scoresTable[0];
  if (highestScore) {
    highestScoreCase.innerHTML = `<div class="score_case">${highestScore.user}: ${highestScore.scoreValue}</div>`;
  }

  scoresCasesTable.innerHTML = '';
  scoresTable.forEach((value) => {
    scoresCasesTable.innerHTML += `<div class="score_case">${value.user}: ${value.scoreValue}</div>`;
  });
}

showScores();

// scores js laurence
/* 
localStorage.setItem('currentScore', 'score.innerHTML');
localStorage.getItem('currentScore');
const scoreCase = document.querySelector('.score_case');
scoreCase.innerHTML += `
  <div><td>${currentScore}</td>`;

 
currentScore = nbUserTurn * 10 - 10;
localStorage.setItem('currentScore', ' (nbUserTurn * 10 - 10)');
localStorage.getItem('currentScore');

const scoreCase = document.querySelector('.score_case');
scoreCase.innerHTML += `
  <div><td>${currentScore}</td>`;



const scoreCases = document.getElementsByClassName('.score_cases');
const finalScore = document.getElementsByClassName('.score');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScore = JSON.parse(localStorage.getItem('highScore')) || [];
//get reference to scores in localStorage & if there are no scores it turns into an empty array (initializaing empty highscores array)

const maxHighScores = 6; // maximum 6 scores can be stored
console.log(highScore);

finalScore.innerHTML = mostRecentScore;

const scores = {
  scores: score.value,
  name: 'lolo',
};

scoreCases.innerHTML = highScore
  .map((scores) => {
    return `<div class="high_score">${scores.name} - ${scores.scores}</div>`;
  })
  .join(''); //converting each element of the array and adding it to the table

highScore.push(score);

//sort function: if b score is higher than a score than put b before a
highScore.sort((a, b) => {
  return b.score - a.score;
});
// highScore.sort((a, b) => b.score - a.score) //same function
highScore.splice(5); //starts cutting off everything after index 5

//update localStorage with scores
localStorage.setItem('highScore', JSON.stringify(highScore));
console.log(highScore);
*/
