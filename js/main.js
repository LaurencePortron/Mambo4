// Initialisation des variables

const carreRouge = document.querySelector('.carreRouge');
const carreBleu = document.querySelector('.carreBleu');
const carreJaune = document.querySelector('.carreJaune');
const carreVert = document.querySelector('.carreVert');
const sequence = [];

// Création des fonctions

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addOpacity(square) {
  square.style.opacity = '0.7';
}

function removeOpacity(square) {
  square.style.opacity = '1';
} 

function

// Fonction principale

function main() {
  const currentRandomInteger = randomInteger(1, 4);
  console.log(currentRandomInteger);

  if (currentRandomInteger === 1) {
    addOpacity(carreRouge);
    setTimeout(function () {
      removeOpacity(carreRouge);
    }, 2000);
  } else if (currentRandomInteger === 2) {
    addOpacity(carreBleu);
    setTimeout(function () {
      removeOpacity(carreBleu);
    }, 2000);
  } else if (currentRandomInteger === 3) {
    addOpacity(carreJaune);
    setTimeout(function () {
      removeOpacity(carreJaune);
    }, 2000);
  } else if (currentRandomInteger === 4) {
    addOpacity(carreVert);
    setTimeout(function () {
      removeOpacity(carreVert);
    }, 2000);
  } else null;

  sequence.push(currentRandomInteger);
}

// Lancement du jeu

setTimeout(main, 5000);


// const carreRouge = document.querySelector('.carreRouge');

// console.log(carreRouge);

// function modifyOpacity() {
//   carreRouge.style.opacity = '0.7';
// }

// function removeOpacity() {
//   carreRouge.style.opacity = '1';
// }

// modifyOpacity();
// setTimeout(removeOpacity, 2000);
