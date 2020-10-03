// Variable initialization

const carreRouge = document.querySelector('.carreRouge');
const carreBleu = document.querySelector('.carreBleu');
const carreJaune = document.querySelector('.carreJaune');
const carreVert = document.querySelector('.carreVert');
// on crée l'array stockant toutes les couleurs possibles
const colorArray = ['.carreRouge', '.carreBleu', '.carreJaune', '.carreVert'];
// on crée l'array qui va nous permettre de stocker la séquence de couleurs
const sequence = [];

// Functions

// fonction permettant de diminuer l'opacité du carré
function addOpacity(square) {
  square.style.opacity = '0.7';
}

// fonction permettant d'augmenter l'opacité du carré
function removeOpacity(square) {
  square.style.opacity = '1';
}

// fonction permettant de changer le "watch" en "play" et vice-versa
function modifyWatchPlay(value) {
  const watchAndPlay = document.querySelector('.watch-and-play');
  watchAndPlay.innerHTML = value;
}

// fonction permettant d'écouter le clic sur un élément
function clickVerification(value) {
  value.addEventListener('click', function () {
    console.log('Well done !');
  });
}

// Main function

function main() {
  // On choisit une couleur au hasard dans l'array des couleurs
  let currentIndexColor = Math.floor(Math.random() * colorArray.length);
  let currentColor = colorArray[currentIndexColor];

  console.log(currentColor);

  // on diminue l'opacité puis on l'augmente x secondes plus tard

  addOpacity(document.querySelector(currentColor));
  setTimeout(function () {
    removeOpacity(document.querySelector(currentColor));
  }, 2000);

  //On envoie la couleur courante dans l'array sequence
  sequence.push(currentColor);
  console.log(sequence);
}

///// Lancement du jeu

setTimeout(main, 3000);
setTimeout(function () {
  modifyWatchPlay('PLAY !');
}, 6000);
