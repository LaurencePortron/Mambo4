// Variables

let order = []; // on va stocker dans cette variable la séquence de 20 couleurs
let playerOrder = []; // liste des couleurs sur lesquelles le joueur a cliqué
let flash; // nombre de couleurs qui se sont allumées
let turn; // tour actuel
let good; // retourne true ou false en fonction du clic du joueur
let compTurn; // retourner true ou false si c'est le tour de l'algo ou du joueur
let intervalID;
let win = false; // retourne si le joueur a gagné ou non

const score = document.querySelector('.score');
const carreRouge = document.querySelector('.carreRouge');
const carreBleu = document.querySelector('.carreBleu');
const carreJaune = document.querySelector('.carreJaune');
const carreVert = document.querySelector('.carreVert');
const watchOrPlay = document.querySelector('.watch-and-play');

function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalID = 0;
  turn = 1;
  score.innerHTML = 'SCORE : 0';
  good = true;
  for (let i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  compTurn = true;

  intervalID = setInterval(gameTurn, 800);
}

function gameTurn() {
  if (flash == turn) {
    clearInterval(intervalID);
    compTurn = false;
    clearColor();
  }

  if (compTurn) {
    clearColor();
    setTimeout(() => {
      if (order[flash] == 1) rouge();
      if (order[flash] == 2) bleu();
      if (order[flash] == 3) jaune();
      if (order[flash] == 4) vert();
      flash++;
    }, 200);
    watchOrPlay.innerHTML = 'PLAY !';
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
  if (!win) {
    setTimeout(() => {
      clearColor();
    }, 300);
  }
});

carreBleu.addEventListener('click', (event) => {
  playerOrder.push(2);
  check();
  bleu();
  if (!win) {
    setTimeout(() => {
      clearColor();
    }, 300);
  }
});

carreJaune.addEventListener('click', (event) => {
  playerOrder.push(3);
  check();
  jaune();
  if (!win) {
    setTimeout(() => {
      clearColor();
    }, 300);
  }
});

carreVert.addEventListener('click', (event) => {
  playerOrder.push(4);
  check();
  vert();
  if (!win) {
    setTimeout(() => {
      clearColor();
    }, 300);
  }
});

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) {
    good = false;
  }

  if (playerOrder.length == 20 && good) {
    winGame();
  }

  if (good == false) {
    watchOrPlay.innerHTML = 'WRONG !';
    setTimeout(() => {
      watchOrPlay.innerHTML = 'WATCH !';
    }, 800);
    compTurn = true;
    flash = 0;
    playerOrder = [];
    good = true;
    intervalID = setInterval(gameTurn, 800);
  }

  if (turn == playerOrder.length && good && !win) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    score.innerHTML = turn * 10 - 10;
    intervalID = setInterval(gameTurn, 800);
  }
}

function winGame() {
  watchOrPlay.innerHTML = 'YOU WIN !';
  win = true;
}

play();
