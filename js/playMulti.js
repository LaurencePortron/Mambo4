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
let player1Turn = true;
let player1Points = 0;
let player2Points = 0;

const score = document.querySelector('.score');
const scorePlayer2 = document.querySelector('.scorePlayer2');
const carreRouge = document.querySelector('.carreRouge');
const carreBleu = document.querySelector('.carreBleu');
const carreJaune = document.querySelector('.carreJaune');
const carreVert = document.querySelector('.carreVert');
const message = document.querySelector('.message');
const startButton = document.querySelector('.start');

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
  score.innerHTML = 'PLAYER 1 SCORE : 0'; // on remet le score à 0
  scorePlayer2.innerHTML = 'PLAYER 2 SCORE : 0'; // on remet le score à 0
  good = true; // on remet good à true si le joueur avait fait une erreur

  for (let i = 0; i < 5; i++) {
    // cette boucle va créer un tableau de 20 chiffres compris entre 1 et 4
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  compTurn = true; // on indique que c'est le tour de l'ordinateur
  interval = setInterval(gameTurn, speedInterval);
  player1Points = 0;
  player2Points = 0;  
}
// cette foncton permet de créer le tour de jeu

function gameTurn() {
  if (nbCompTurn == nbUserTurn) {
    // on compare le nb de tours de l'utilisateur à celui de l'ordinateur
    clearInterval(interval); // on stoppe la fonction
    compTurn = false; // on indique que ce n'est pas le tour de l'ordinateur
    clearColor(); // on éteint les couleurs
    if (player1Turn){
      message.innerHTML = "PLAYER 1 TURN";
    } else {
      message.innerHTML = "PLAYER 2 TURN";
    }
    player1Turn = !player1Turn; 
  }

  if (compTurn) {
    // on vérifie que ce soit le tour de l'ordinateur
    clearColor(); // on éteint les couleurs
    setTimeout(() => {
      message.innerHTML = "COMPUTER TURN";
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
}

function bleu() {
  carreBleu.style.opacity = '0.7';
}

function jaune() {
  carreJaune.style.opacity = '0.7';
}

function vert() {
  carreVert.style.opacity = '0.7';
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
  setTimeout(() => {
    clearColor();
  }, 300);
});

carreBleu.addEventListener('click', (event) => {
  playerOrder.push(2);
  check();
  bleu();
  setTimeout(() => {
    clearColor();
  }, 300);
});

carreJaune.addEventListener('click', (event) => {
  playerOrder.push(3);
  check();
  jaune();
  setTimeout(() => {
    clearColor();
  }, 300);
});

carreVert.addEventListener('click', (event) => {
  playerOrder.push(4);
  check();
  vert();
  setTimeout(() => {
    clearColor();
  }, 300);
});

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) {
    good = false;
  }

  if (playerOrder.length == 20 && good) {
    winGame();
  }

  if (good == false) {
    if (player1Turn){
      message.innerHTML = `PLAYER 1 WINS ${player1Points} pts`; 
    } else {
      message.innerHTML = `PLAYER 2 WINS ${player2Points} pts`;      
    }
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
    if (player1Turn) {
      player2Points = player2Points + 10;
      scorePlayer2.innerHTML = 'PLAYER 2 SCORE : ' + player2Points;
    } else {
      player1Points = player1Points + 10;
      score.innerHTML = 'PLAYER 1 SCORE : ' + player1Points;
    }
    interval = setInterval(gameTurn, speedInterval);
  }
}

function winGame() {
  message.innerHTML = 'PLAYER 1 AND PLAYER 2 WIN ! / COMPUTER LOOSE !';
  setTimeout(() => {
    message.innerHTML = '';
  }, 2000);
  win = true;
}
// scores js laurence
let scoreTable = [
  {
    name: 'lolo',
    score: '400',
  },
  {
    name: 'amandine',
    score: '500',
  },
];

function compare(a, b) {
  if (a.score > b.score) {
    return -1;
  } else if (b.score < a.score) {
    return 1;
  } else return 0;
}

let sortedScoreTable = scoreTable.sort(compare);
console.log(sortedScoreTable);

for (let i = 0; i < sortedScoreTable.length; i++) {
  const scoreCase = document.querySelector('.score_case');
  scoreCase.innerHTML += `
  <div><td>${sortedScoreTable[i].name}</td>
  <td>${sortedScoreTable[i].score}</td></div>
 `;
}