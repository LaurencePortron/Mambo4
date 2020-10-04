// Variables

let order = []; // on va stocker dans cette variable la séquence de 20 couleurs
let playerOrder = []; // liste des couleurs sur lesquelles le joueur a cliqué
let nbCompTurn; // nombre de tour qu'a joué l'ordinateur
let nbUserTurn; // tour actuel
let good; // retourne true ou false si le joueur clique sur la bonne ou la mauvaise couleur
let compTurn; // true si c'est au tour de l'ordinateur
let interval;
let win; // si true, le joueur a gagné

const score = document.querySelector('.score');
const carreRouge = document.querySelector('.carreRouge');
const carreBleu = document.querySelector('.carreBleu');
const carreJaune = document.querySelector('.carreJaune');
const carreVert = document.querySelector('.carreVert');
const watchOrPlay = document.querySelector('.watch-and-play');
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
  score.innerHTML = 'SCORE : 0'; // on remet le score à 0
  good = true; // on remet good à true si le joueur avait fait une erreur

  for (let i = 0; i < 20; i++) {
    // cette boucle va créer un tableau de 20 chiffres compris entre 1 et 4
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  compTurn = true; // on indique que c'est le tour de l'ordinateur
  interval = setInterval(gameTurn, 800);
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
    watchOrPlay.innerHTML = "You're stupid!";
    setTimeout(() => {
      watchOrPlay.innerHTML = '';
      clearColor();
      compTurn = true;
      nbCompTurn = 0;
      playerOrder = [];
      good = true;
      interval = setInterval(gameTurn, 800);
    }, 800);
  }

  if (nbUserTurn == playerOrder.length && good && !win) {
    nbUserTurn++;
    playerOrder = [];
    compTurn = true;
    nbCompTurn = 0;
    score.innerHTML = nbUserTurn * 10 - 10;
    interval = setInterval(gameTurn, 800);
  }
}

function winGame() {
  watchOrPlay.innerHTML = 'YOU WIN !';
  win = true;
}
