// Gestion du changement de login

const changeLogin = document.querySelector('.login');

changeLogin.addEventListener('click', function () {
  sessionStorage.removeItem('user');
});

// Affichage du username sur la page settings

const displayCurrentUser = document.querySelector('.display-current-user');

let currentUserName = sessionStorage.user;
if (currentUserName !== '') {
  displayCurrentUser.innerHTML = currentUserName;
}

// Gestion de l'affichage des différentes vues

const saveButton = document.querySelector('.save');
const scoreButton = document.querySelector('.score-button');
const playBody = document.querySelector('.play-body');
const settingsBody = document.querySelector('.settings-body');
const scoresBody = document.querySelector('.scores-body');

let soundActive = true;

saveButton.addEventListener('click', function () {
  playBody.style.display = 'block';
  window.scrollTo(0, 0);
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

const buttonSwitchSound = document.querySelector('#switch-sounds');
buttonSwitchSound.addEventListener('change', () => {
  if (buttonSwitchSound.checked) {
    imageSoundOnOff.setAttribute('src', '../images/imgmusic.jpg');
    soundActive = true;
  } else {
    imageSoundOnOff.setAttribute('src', '../images/imgmute.png');
    soundActive = false;
  }
});
// Gestion de l'arrivée sur la page via le bouton score

if (sessionStorage.scores == 'true') {
  settingsBody.style.display = 'none';
  scoresBody.style.display = 'block';
  playBody.style.display = 'none';
  sessionStorage.removeItem('scores');
} else {
  settingsBody.style.display = 'block';
  scoresBody.style.display = 'none';
  playBody.style.display = 'none';
}

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

let rougeSound = document.querySelector('.do');
let vertSound = document.querySelector('.re');
let bleuSound = document.querySelector('.mi');
let jauneSound = document.querySelector('.si');

carreRouge.classList.add('disabled');
carreBleu.classList.add('disabled');
carreJaune.classList.add('disabled');
carreVert.classList.add('disabled');

// création d'un écouteur, déclenchant le jeu par un clic sur le bouton start
startButton.addEventListener('click', (event) => {
  playGame();
});

// fonction permettant d'initialiser le jeu

function playGame() {
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
    compTurn = false; // on indique que ce n'est pas le tour de l'
    message.innerHTML = 'PLAY!';
    clearColor(); // on éteint les couleurs

    carreRouge.classList.remove('disabled');
    carreBleu.classList.remove('disabled');
    carreJaune.classList.remove('disabled');
    carreVert.classList.remove('disabled');
  }

  if (compTurn) {
    // on vérifie que ce soit le tour de l'ordinateur
    message.innerHTML = 'WATCH!';
    clearColor(); // on éteint les couleurs

    carreRouge.classList.add('disabled');
    carreBleu.classList.add('disabled');
    carreJaune.classList.add('disabled');
    carreVert.classList.add('disabled');
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
  if (soundActive) {
    rougeSound.play();
  }
}

function bleu() {
  carreBleu.style.opacity = '0.7';
  if (soundActive) {
    bleuSound.play();
  }
}

function jaune() {
  carreJaune.style.opacity = '0.7';
  if (soundActive) {
    jauneSound.play();
  }
}

function vert() {
  carreVert.style.opacity = '0.7';
  if (soundActive) {
    vertSound.play();
  }
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
  if (soundActive) {
    rougeSound.play();
  }
  setTimeout(() => {
    clearColor();
    if (soundActive) {
      rougeSound.pause();
    }
  }, 300);
});

carreBleu.addEventListener('click', (event) => {
  playerOrder.push(2);
  check();
  bleu();
  if (soundActive) {
    bleuSound.play();
  }
  setTimeout(() => {
    clearColor();
    if (soundActive) {
      bleuSound.pause();
    }
  }, 300);
});

carreJaune.addEventListener('click', (event) => {
  playerOrder.push(3);
  check();
  jaune();
  if (soundActive) {
    jauneSound.play();
  }
  setTimeout(() => {
    clearColor();
    if (soundActive) {
      jauneSound.pause();
    }
  }, 300);
});

carreVert.addEventListener('click', (event) => {
  playerOrder.push(4);
  check();
  vert();
  if (soundActive === true) {
    vertSound.play();
  }
  setTimeout(() => {
    clearColor();
    if (soundActive) {
      vertSound.pause();
    }
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

    carreRouge.classList.add('disabled');
    carreBleu.classList.add('disabled');
    carreJaune.classList.add('disabled');
    carreVert.classList.add('disabled');
    setTimeout(() => {
      message.innerHTML = '';
      clearColor();
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

// choix du type de son
let soundDefault = 'music';
let soundChosen = document.querySelector(`.emoji-${soundDefault}`);
soundChosen.classList.add('emoji-default');
const soundCat = document.querySelector(`.emoji-cat`);
const soundMusic = document.querySelector(`.emoji-music`);
const soundPoo = document.querySelector(`.emoji-poo`);
soundCat.addEventListener('click', function () {
  soundChosen.classList.remove('emoji-default');
  soundChosen = document.querySelector(`.emoji-cat`);
  rougeSound = document.querySelector('.bouc');
  vertSound = document.querySelector('.chien');
  bleuSound = document.querySelector('.chat');
  jauneSound = document.querySelector('.cheval');
  soundChosen.classList.add('emoji-default');
});
soundMusic.addEventListener('click', function () {
  soundChosen.classList.remove('emoji-default');
  soundChosen = document.querySelector(`.emoji-music`);
  rougeSound = document.querySelector('.do');
  vertSound = document.querySelector('.re');
  bleuSound = document.querySelector('.mi');
  jauneSound = document.querySelector('.si');
  soundChosen.classList.add('emoji-default');
});
soundPoo.addEventListener('click', function () {
  soundChosen.classList.remove('emoji-default');
  soundChosen = document.querySelector(`.emoji-poo`);
  rougeSound = document.querySelector('.pet1');
  vertSound = document.querySelector('.pet2');
  bleuSound = document.querySelector('.pet3');
  jauneSound = document.querySelector('.pet4');
  soundChosen.classList.add('emoji-default');
});

// When the player won or lost, we add the score to the table
function addScoreToTable() {
  scoresTable.unshift({ user: currentUserName, scoreValue });
  //scoresTable.slice(5);

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
    highestScoreCase.innerHTML = `<div class="score_case">${highestScore.user}\u00A0\u00A0\u00A0\u00A0 - \u00A0\u00A0\u00A0\u00A0${highestScore.scoreValue}</div>`;
  }

  scoresCasesTable.innerHTML = '';
  scoresTable.slice(0, 10).forEach((value) => {
    scoresCasesTable.innerHTML += `<div class="score_case">${value.user}\u00A0\u00A0\u00A0\u00A0  - \u00A0\u00A0\u00A0\u00A0   ${value.scoreValue}</div>`;
  });
}

showScores();
